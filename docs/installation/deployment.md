---
id: deployment
title: Setup & Deployment
---

## Server Setup

### Install the required applications

To make our app to run, we have to install these two application nodejs and mongodb. Follow the steps below to install them.

#### Install NodeJs

To install nodejs in ubuntu server:

- **Add nodejs PPA**

    * `sudo apt-get install curl python-software-properties`
    * `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -` 
    
    > __*Note:*__ Just the change the setup_10.x to any version you want to install. Its recommended to use the latest LTS release.

- **Install nodejs**
    * `sudo apt-get install nodejs`

- **Test Nodejs and NPM version**
    * `node -v` - to check the nodejs version
    * `npm -v` - to check the npm version

    If you get the versions of node and npm, you have successfully installed nodejs. You can visit this [link](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/) for more details.


#### Install Mongodb

To install mongodb in ubuntu server:

- **Import the public key used by the package management system**
    
    `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4`

- **Create a /etc/apt/sources.list.d/mongodb-enterprise.list file for MongoDB**
    
    `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list`

- **Reload local package database**
    
    `sudo apt-get update`

- **Install the MongoDB packages**
    
    `sudo apt-get install -y mongodb-org`

- **Mongodb commands**
    
    `sudo service mongod start` - start mongodb
    
    `sudo service mongod stop` - stop mongodb
    
    `sudo service mongod restart` - restart mongodb
    
    `sudo mongo` - open mongo shell

For more information, just visit this [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

### Adding Security and Domain

To make the application more secure, we have to setup a password to our database and enable https for secure connection.

#### Setup mongodb account

To add a user and password to our database following steps:

* Open mongo shell.
    
    `sudo mongo`

* Create admin account
    
    `use admin` - to go to admin database

    Copy and paste this, can decide your own admin user and password

    ```
    db.createUser(
        {
            user: "admin_user",
            pwd: "admin_password",
            roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
        }
    )
    ```

* Create user for your database
    
    `use omotenashi`

    Copy and paste this, just change the user and password.

    ```
    db.createUser(
    {
        user: "omotenashiuser",
        pwd: "Xt7dPvbF3e9MCiq",
        roles: [ { role: "readWrite", db: "omotenashi" } ]
    })
    ```
        
    Just make sure that the db is the name of you database.

* Enable authentication and open Mongodb access up to all IPs

    After creating user to your database its actually useless unless you enable authentication in mongod.conf because it is disabled by default.

    - `sudo vim /etc/mongod.conf` - to open mongo config.

    - To allow other IP to access this mongodb server, because by default it is only accessible by your localhost or the server itself.
        ```
        # network interfaces
        net:
        port: 27017
        #  bindIp: 127.0.0.1  <- comment out this line
        bindIp: 0.0.0.0 <- or uncomment it then change the ip to 0.0.0.0
        ```
        > __*Warning:*__ Do not comment out the `bindIp` line without enabling authorization. Otherwise you will be opening up the whole internet to have full admin access to all mongo databases on your MongoDB server!

    - To enable authentication uncomment `security`
        ```
        security:
            authorization: 'enabled'
        ```
    - Finally, open port 27017 in the security group of your EC2 instance. Just ask the admin to open it.

* Restart mongo daemon to load the updated config.
    - `sudo service mongod restart`

* Make sure that the user and pass that you set in the mongodb is also set in the app.
    - Add user and pass in config.js
    ```
    const config = {
        db: {
            host: 'localhost',
            port: 27017,
            name: 'omotenashi',
            user: 'omotenashiuser',
            pass: 'Xt7dPvbF3e9MCiq'
        }
    }
    ```
    - Set your mongodb connection in app.js.
    ```
    let config = require('./config');
    let {host, dbport, name:dbName, user:dbuser, pass:dbpass} = config.db;
    let dbConnection = `mongodb://${dbuser}:${dbpass}@${host}:${dbport}/${dbName}`;
    
    // initialize mongodb
    mongoose.connect(dbConnection, { useNewUrlParser: true });
    ```

    Thats it, your database now requires user and password before anyone can access it. For more details, please visit this [link](https://ianlondon.github.io/blog/mongodb-auth/).



#### Enable https

To enable https access we need to do the following:

- **Install Nginx**
    - `sudo apt-get install nginx -y`

        Once its complete you can check the status of your Nginx:
    - `sudo systemctl status nginx`

        > __*Note:*__ You may need to stop the apache server to run nginx server.

    - Nginx commands
        - `sudo systemctl start nginx` - to start Nginx server.
        - `sudo systemctl enable nginx` - to run this on startup.

- **Install Certbot**

    The first step of using Let's Encrypt to obtain an SSL certificate is to install the Certbot software on your server. Certbot is in very active development, so the Certbot packages provided by Ubuntu tend to be outdated. However, the Certbot developers maintain a Ubuntu software repository with up-to-date versions, so we'll use that repository instead.

    - `sudo add-apt-repository ppa:certbot/certbot` - add repository
    - `sudo apt-get update` - update package list
    - `sudo apt-get install python-certbot-nginx` - install Certbot

- **Setting up Nginx**
    
    To enable SSL you need a domain. To add that in nginx configuration:
    
    - `sudo rm /etc/nginx/sites-available/default` - remove the original configuration.
    - `sudo nano /etc/nginx/sites-available/default` - use nano to create new config file.
    - Paste following and replace your_domain.com with your own domain.

        ```
        server {
            listen 80;
            server_name omotenashi.net;
            location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                proxy_redirect off;
            }
        }
        ```

    This will have all HTTP web traffic redirected to port 3000. Our application from the boilerplate code is pointed at 3000.

    - `ctrl+o` to save it, then `ctrl+x` to close the nano editor.

    - `sudo nginx -t` - to verify the syntax.
        
        Once the configuration syntax is correct, reload the Nginx to load the new configuration.

    - `sudo systemctl reload nginx` - to reload nginx

        Certbot will now be able to find the correct server block and update it. Next, we'll update our firewall to allow HTTPS traffic.

- **Allowing HTTPS Through the Firewall**

    If you have your firewall enabled, you'll need to adjust the settings to allow for HTTPS traffic. Luckily, Nginx registers a few profiles with ufw upon installation.

    - `sudo ufw status`

        ```
        Output
        Status: active

        To                         Action      From
        --                         ------      ----
        OpenSSH                    ALLOW       Anywhere                  
        Nginx HTTP                 ALLOW       Anywhere                  
        OpenSSH (v6)               ALLOW       Anywhere (v6)             
        Nginx HTTP (v6)            ALLOW       Anywhere (v6)
        ```

        To additionally let in HTTPS traffic, we can allow the Nginx Full profile and then delete the redundant Nginx HTTP profile allowance:
    
    - `sudo ufw allow 'Nginx Full'`
    - `sudo ufw delete allow 'Nginx HTTP'`

- **Create a A record for omotenashi.net**
    - In your AWS console, go to **route 52**.
    - Select the omotenashi domain in the list
    - Create an A record with a name omotenashi.net and point it to the ip of the EC2 server where your app is hosted.

- **Obtaining SSL ccertificate**

    Certbot provides a variety of ways to obtain SSL certificates, through various plugins. The Nginx plugin will take care of reconfiguring Nginx and reloading the config whenever necessary:

    - `sudo certbot --nginx -d omotenashi.net`
        > __*Warning:*__ Before running this command, make sure that the port 80 and 443 in security group of your EC2 instance is open to all so that the let's encrypt challenge validation will not fail.
        
        > __*Note:*__ If this is your first time running certbot, you will be prompted to enter an email address and agree to the terms of service. After doing so, certbot will communicate with the Let's Encrypt server, then run a challenge to verify that you control the domain you're requesting a certificate for.
    
    If that's successful, certbot will ask how you'd like to configure your HTTPS settings.

    ```
    Output
    Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
    -------------------------------------------------------------------------------
    1: No redirect - Make no further changes to the webserver configuration.
    2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
    new sites, or if you're confident your site works on HTTPS. You can undo this
    change by editing your web server's configuration.
    -------------------------------------------------------------------------------
    Select the appropriate number [1-2] then [enter] (press 'c' to cancel):
    ```
    
    Just select `2` then press enter. Done!
    Congrats! your application can now be access using `https://omotenashi.net`.

- **Verifing Certbot Auto-Renewal**
    Let's encrypt's certificate are only valid for 90 days. The cerbot package we installed takes care of this by running `certbot renew` twice a day via a systemd timer.

    To test the renewal process:
    - `sudo certbot renew --dry-run`

    If you see no errors, you're all set.
    > __*Note:*__ If port 80 and 443 are restricted to only few IP addresses, the renewal of the certificate will fail.

    For more details about obtaining SSL certificate, please visit this [link](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04).


## Application Setup

The application has 2 main folders: BackEnd and FrontEnd. BackEnd folder contains all the files related to backend processes. You may read more about it in the [Back-End Guide](backend-guide/structure). Similarly, FrontEnd folder is where all files for frontend are stored. Go to [Front-End Guide](frontend-guide/structure) to read more about frontend.

The entry point of the application is the app.js located in the `BackEnd` folder. The app.js points to the `dist` folder in `FrontEnd`.

```
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/dist/index.html'));
});
```

### Frontend

In order to publish your changes to AWS server, follow the following steps:

1. Inside the FrontEnd folder in the terminal, type in ```ng build --prod --aot```. 
`-- prod` indicates that this build is for production environment and will generate a `dist` folder.
`--aot` complies the app during build time. Compiling your application during the build process provides a faster rendering in the browser.
2. When build is complete, push all the changes to git using ``git push origin master`` command.
3. Open a new terminal and input this command: ```sudo ssh -i ~<location of .pem file> <link of the EC2 servcer>``` For security purposes, ask for the details from the POC.
4. Input your PC password when prompted.
5. If credentials are valid, you will then see a list of folders. Navigate to the FrontEnd folder and pull from there by running ``sudo git pull origin master`` command in the terminal and input your git credentials. This means that the `dist` folder in the server is now updated.
6. You have now deployed your changes to AWS server. You can then verify the changes in the actual site address.

### Backend

#### Clone the app from the repository

Now that the server is ready, its time to clone time app from the repository.

- `sudo git clone https://gangle.backlog.jp/git/OMOTENASHI/BackEnd.git` - to clone the app. 
- `cd BackEnd` - go to BackEnd directory
- `npm install` - install the dependencies

It will take few minutes to complete. 

#### Running the app

The last step of deployment is to run the app. This time we will run it using PM2 module.

#### PM2

PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

To install pm2 module: `npm install pm2 -g`

The following are some of the pm2 commands:

| Command | Description |
| ----------- | ----------- |
| `pm2 start app.js` | Start the application |
| `pm2 list` | See the running apps: |
| `pm2 logs app` | Check the logs |
| `pm2 restart app` | Restart the application |


#### Pulling app updates

If you change some codes in your local computer and you want to update the production server. You have to push your update first. Then in the server terminal, pull it using git pull command. Run `npm install` if you added new package. Then finally, restart the app in the pm2.
