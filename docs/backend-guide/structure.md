---
id: structure
title: Structure & Overview
---

## File structure

This is the file structure of the omotenashi project.

```bash
app/
├─── controllers/      # contains all the controller files
│   ├─── background.controller.js
│   ├─── calendar.controller.js
│   ├─── card.controller.js
│   ├─── front.controller.js
│   ├─── gms.controller.js
│   ├─── logo.controller.js
│   ├─── preview.controller.js
│   ├─── schedule.controller.js
│   ├─── setting.controller.js
│   └── welcome_screen.controller.js
├─── helpers/          # contains all the reusable functions
│   ├─── client_secret.json
│   ├─── datetime.js
│   ├─── google-calendar.js
│   ├─── upload.js
│   └── validation.js
├─── middlewares/      # route middlewares, used for password protections
│   └──auth_guard.js
├─── models/           # contains all the model files
│   ├─── background.model.js
│   ├─── calendar.model.js
│   ├─── font.model.js
│   ├─── logo.model.js
│   ├─── schedule.model.js
│   └── setting.model.js
├─── node_modules/     # contains all the dependencies 
├─── routes/           # contains the routes
│   ├─── api/               # contains the route file of each modules
│   │   ├─── background.route.js
│   │   ├─── calendar.route.js
│   │   ├─── card.route.js
│   │   ├─── font.route.js
│   │   ├─── gms.route.js
│   │   ├─── logo.route.js
│   │   ├─── preview.route.js
│   │   ├─── schedule.route.js
│   │   ├─── script.route.js
│   │   ├─── setting.route.js
│   │   ├─── test.route.js
│   │   └── welcome_screen.route.js
│   └── api.js             # list the routes of all modules 
├─── services/         # contains all the files use to connect to database
│   ├─── background.service.js
│   ├─── font.service.js
│   ├─── logo.service.js
│   ├─── schedule.service.js
│   ├─── setting.service.js
│   ├─── welcome_screen.service.js
│   └── calendar.service.js
├─── scripts/          # contains all the script file which is only use by the developer to run some script like exporting some excel file
│   └── import-to-calendar.js
├─── tests/            # just for testing
├─── .eslintrc.json    # settings of eslint use as a guide while coding.
├─── .gitignore        # list of files that are excluded in git
├─── app.js            # entry point of the app
├─── config.js         # configuration of the database, ports and link to gms api
└── package.json      # detail of the app and all its dependencies
```

## Application entry point

The application starts at `app.js`. It will do the following once it is run: 

- Create the express app instance
```
let express = require('express');
let app = express();
```

- Initialize the mongodb connection
```
// set promise
mongoose.Promise = bluebird;
// initialize mongodb
mongoose.connect(dbConnection, { useNewUrlParser: true });
```

- Configure CORS
```
app.use(cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
}));
```

- Create route that will return the index.html of the frontend
```
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/dist/index.html'));
});
```

- Load the routes
```
app.use('/api', apis);
```

- listen to port 3000
```
app.listen(port, (err) => { 
    if(err) {
        console.log("Error connecting to port" + err);
    } else {
        console.log('Running on port ' + port);
    }
});
```

## Running the application

There 4 ways of running the node app. Which is the best or recommended among them depends on the purpose of running the app. Assuming the name of the entry point is `app.js`.

- `node app` - the usual way of running the node application. This is use during development.
- `nodemon app` - this method requires to install nodemon package. Check this [link](http://localhost:3000/docs/installation/install-dependencies#installing-dependencies) how to install npm packages. Running the app in this way will automatically restart the app when you save your code. This is better way of running the app during development.
- `pm2 start app` - this is recommended when you are deploying the app in the production mode since pm2 will automatically restart the app when an error occur. You have to install pm2 package before using this.
- Debug mode - when you run the app in debug mode, you can set breakpoints anywhere in the code, so that you can pause its execution and check what is happening in every line in the code. This is recommended when you are debugging your code.
    
    Running in debug mode:

    - Click the bug icon in the left sign of the VS Code.
    - Click the the color green **Play button** in the upper left. If a dropdown will appear just select **node**.
    - Wait until the code is running in debug mode.

    For more details on VS code debugging, please visit this [link](https://code.visualstudio.com/docs/editor/debugging).

## Modules

These are the modules of omotenashi backend.

- Calendar (e.g. omotenashi.net/api/calendar/)
- Schedule (e.g. omotenashi.net/api/schedule/)
- Message Card (e.g. omotenashi.net/api/messagecard/)
- Setting (e.g. omotenashi.net/api/setting/)
- Background (e.g. omotenashi.net/api/background/)
- Font (e.g. omotenashi.net/api/font/)
- Logo (e.g. omotenashi.net/api/logo/)
- Preview (e.g. omotenashi.net/api/preview/)

Please see the next sections for a detailed explanation of these APIs