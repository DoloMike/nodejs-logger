// import express server and middleware
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// use middleware
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// import and create sequelize db connection
const config = require('config');
const dbConfig = config.get('db');
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.name,
    dbConfig.userName,
    dbConfig.password,
    dbConfig.options
)

// import models
const Log = sequelize.import(__dirname + '/models/Log.js')

/**
 * 
 * RESTFUL API ENDPOINTS BELOW
 * 
 */

// respond with select * from LOG Table when a GET request is made to the homepage
// curl http://localhost:3000/
app.get('/', async (req, res) => {
    let allLogs
    try {
        allLogs = await Log.findAll()
    } catch (err) {
        return res.status(500).send()
    }

    res.send(allLogs)
})

// POST method route
// curl -H "Content-Type: application/json" -X POST -d '{"appName":"app2","action":"read from msp"}' http://localhost:3000/log/
app.post('/log', (req, res) => {
    const appName = req.body.appName
    const action = req.body.action
    
    try {
        Log.create({
            appName,
            action,
        });
    } catch (err) {
        return res.status(500).send()
    }
})

// start app
app.listen(3000);