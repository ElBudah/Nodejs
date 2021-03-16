const express = require('express');
const app = express();
const sql = require('mssql');

//Connection configurations with mssql 
const config = {
    user: 'sa',
    password: 'something',
    server: 'localhost',
    database: 'Locations',
    port: 49699
};

//What will be shown at root 
app.get('/',function(req,res){
    sql.connect(config, function(err){
        if(err) console.log(err);
        let sqlRequest = new sql.Request();
        let sqlQuery = 'Select * from Destinos';
        sqlRequest.query(sqlQuery, function(err,data){
            res.send(data);
            sql.close();
        });
    });
});

//Type http:/localhost:5000 at the browser to access the root 
const webser = app.listen(5000, function(){
    console.log("The webserver is running");
});
