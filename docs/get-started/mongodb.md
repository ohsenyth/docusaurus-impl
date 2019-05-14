---
id: mongodbguide
title: MongoDB & Mongoose Guide
sidebar_label: MongoDB & Mongoose Guide
---

## MongoDB & Mongoose Framework

**Mongoose** is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

**MongoDB** is a schema-less NoSQL document database. It means you can store JSON documents in it, and the structure of these documents can vary as it is not enforced like SQL databases. This is one of the advantages of using NoSQL as it speeds up application development and reduces the complexity of deployments.

### Building a schema

Here's an example on creating a schema using mongoose.
File name: backgroundModel.js

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const backgroundSchema = new Schema(
    {
        name: {type: String, required: true},
        link: {type: String, required: true},
        use: {type: String, default: 'screen'},
        reg_date: {type: Date, default: Date.now()}
        update_date: {type: Date, default: Date.now()},
        dis: {type: Boolean, default: true}
    }
);

//Export model
module.exports = mongoose.model('backgrounds', backgroundSchema);
```

### Querying database using mongoose

Querying using Mongoose is very easy. Here's a basic example:

```
const Background = require('./backgroundModel');
exports.getBackgroundList = async (id) => {
    try {
        let result = await Background.find();
        return result;
    } catch (err) {
        throw new Error(err);
    }
}
```

Model.find() will get all the document in the collection.

The above code will return something like this:

```
{
    _id: '5c75efb8a630c11358be0bad',
    name: 'arial',
    link: 'https://www.dropbox.com/s/ddz1nmu6ywjykql/GreatVibes-Regular.ttf?dl=0',
    use: 'screen',
    reg_date: '2018-12-18T09:02:55.363Z',
    update_date: '2018-12-18T09:02:55.365Z',
    dis: true
}
```

For more details about mongoose and mongodb, please visit [mongoose](https://mongoosejs.com/docs/guide.html) and [mongodb](https://docs.mongodb.com/manual/introduction/) documentation.