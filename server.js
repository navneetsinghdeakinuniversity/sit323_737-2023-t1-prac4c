const express = require("express");
const res = require("express/lib/response");
const app = express();

const {transports, createLogger, format} = require('winston');

const logger = createLogger({
    // Creating a format for logging by using simple winston format and combining it with timetamp.
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    defaultMeta: {service: 'user-service'},
    transports: [
        // -Write all the logs with importance level of 'error or less in 'error.log'
        // Write all logs with importance level of 'info' or less to 'info.log'

        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error'}),
        new transports.File({ filename: 'info.log', level:'info'}),
    ],
});

// If not in production then log to the console.

if(process.env.NODE_ENV !== 'production'){
    logger.add(new transports.Console({
        format: format.combine(
            format.timestamp(),
            format.json()
        ),
    }));
}

// defining functions
const add= (n1,n2) => {
    return n1+n2;
}
const subtract= (n1,n2) => {
    return n1-n2;
}
const multiply= (n1,n2) => {
    return n1*n2;
}
const divide= (n1,n2) => {
    return n1/n2;
}

// defining endpoints
app.get("/add", (req,res)=>{
    try{
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        logger.info(`New addition operation requested:`);
        if(isNaN(n1)){
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 is incorrectly defined");
        }
        if(isNaN(n2)){
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 is incorrectly defined");
        }

        if (n1 === NaN || n2 === NaN) {
            console.log()
            logger.error("Parsing error");
            throw new Error("Parsing Error");
        }
        logger.info(`Performing addition operation: ${n1} + ${n2}`);

        const result = add(n1,n2);

        logger.info(`Result of addition operation: ${result}`);
        res.status(200).json({statuscode:200, data: result });
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
    }
});

app.get("/subtract", (req,res)=>{
    try{
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        logger.info(`New subtraction operation requested:`);
        if(isNaN(n1)){
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 is incorrectly defined");
        }
        if(isNaN(n2)){
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 is incorrectly defined");
        }

        if (n1 === NaN || n2 === NaN) {
            console.log()
            logger.error("Parsing error");
            throw new Error("Parsing Error");
        }
        logger.info(`Performing subtraction operation: ${n1} - ${n2}`);
        
        const result = subtract(n1,n2);
        logger.info(`Result of subtraction operation: ${result}`);
        res.status(200).json({statuscode:200, data: result });
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
    }
});

app.get("/multiply", (req,res)=>{
    try{
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        logger.info(`New multiplication operation requested:`);
        if(isNaN(n1)){
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 is incorrectly defined");
        }
        if(isNaN(n2)){
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 is incorrectly defined");
        }

        if (n1 === NaN || n2 === NaN) {
            console.log()
            logger.error("Parsing error");
            throw new Error("Parsing Error");
        }
        logger.info(`Performing multiplication operation: ${n1} * ${n2}`);
        
        const result = multiply(n1,n2);
        logger.info(`Result of multiplication operation: ${result}`);
        res.status(200).json({statuscode:200, data: result });
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
    }
});

app.get("/divide", (req,res)=>{
    try{
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        logger.info(`New division operation requested:`);
        if(isNaN(n1)){
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 is incorrectly defined");
        }
        if(isNaN(n2)){
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 is incorrectly defined");
        }

        if (n1 === NaN || n2 === NaN) {
            console.log()
            logger.error("Parsing error");
            throw new Error("Parsing Error");
        }
        logger.info(`Performing division operation: ${n1} * ${n2}`);

        const result = divide(n1,n2);
        logger.info(`Result of division operation: ${result}`);
        res.status(200).json({statuscode:200, data: result });
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
    }
});


const port=3040;
app.listen(port,() => {
    console.log("hello I'm listening to port: "+port);
})
