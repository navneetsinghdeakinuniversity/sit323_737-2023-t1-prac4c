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

// function to add two numbers
const add= (n1,n2) => {
    return n1+n2;
}

// function to subtract two numbers
const subtract= (n1,n2) => {
    return n1-n2;
}

// function to multiply two numbers
const multiply= (n1,n2) => {
    return n1*n2;
}

// function to divide number n1 by n2
const divide= (n1,n2) => {
    return n1/n2;
}

// function to check for NaN values
function checknan(n1,n2) {
    //if n1 is not a number log and throw error
    if(isNaN(n1)){ 
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 is incorrectly defined");
    }
    //if n2 is not a number log and throw error
    if(isNaN(n2)){
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 is incorrectly defined");
    }
    //if n1 or n2 is NaN log and throw error
    if (n1 === NaN || n2 === NaN) {
        console.log()
        logger.error("Parsing error");
        throw new Error("Parsing Error");
    }
}

// defining endpoints
app.get("/add", (req,res)=>{
    try{
        // get the numbers from the URL request
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        logger.info(`New addition operation requested:`);
        
        // call function to check for NaN values
        checknan(n1,n2);
        logger.info(`Performing addition operation: ${n1} + ${n2}`);
        
        // call function to perfrom the arithmetic operation
        const result = add(n1,n2);

        logger.info(`Result of addition operation: ${result}`);
        res.status(200).json({statuscode:200, data: result });
    } catch(error) {
        // block to catch error and throw to console with error code
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
    }
});

app.get("/subtract", (req,res)=>{
    try{
        // get the numbers from the URL request
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        logger.info(`New subtraction operation requested:`);

        // call function to check for NaN values
        checknan(n1,n2);
        logger.info(`Performing subtraction operation: ${n1} - ${n2}`);
        
        // call function to perfrom the arithmetic operation    
        const result = subtract(n1,n2);
        logger.info(`Result of subtraction operation: ${result}`);
        res.status(200).json({statuscode:200, data: result });
    } catch(error) {
        // block to catch error and throw to console with error code
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
    }
});

app.get("/multiply", (req,res)=>{
    try{
        // get the numbers from the URL request
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        logger.info(`New multiplication operation requested:`);

        // call function to check for NaN values
        checknan(n1,n2);

        logger.info(`Performing multiplication operation: ${n1} * ${n2}`);
        
        // call function to perfrom the arithmetic operation
        const result = multiply(n1,n2);
        logger.info(`Result of multiplication operation: ${result}`);
        res.status(200).json({statuscode:200, data: result });
    } catch(error) {
        // block to catch error and throw to console with error code
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
    }
});

app.get("/divide", (req,res)=>{
    try{
        // get the numbers from the URL request
        const n1= parseFloat(req.query.n1);
        const n2= parseFloat(req.query.n2);
        logger.info(`New division operation requested:`);

        // call function to check for NaN values
        checknan(n1,n2);

        // Check if the either numbers are zero
        if (n1 == 0 || n2 == 0) {
            console.log()
            logger.error("Division by zero undefined");
            throw new Error("Division by zero undefined");
        }
        logger.info(`Performing division operation: ${n1} * ${n2}`);

        // call function to perfrom the arithmetic operation
        const result = divide(n1,n2);
        logger.info(`Result of division operation: ${result}`);
        res.status(200).json({statuscode:200, data: result });
    } catch(error) {
        // block to catch error and throw to console with error code
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
    }
});


const port=3040;
app.listen(port,() => {
    console.log("hello I'm listening to port: "+port);
})
