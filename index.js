const express = require('express');
const app = express();
const sql = require('mssql');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

//To use static files (css, imgs...) use express static -> __dirname/public/css/index.css
app.use(express.static(__dirname + '/public'));

//Connection configurations with mssql
const config = {
    user: 'sa',
    password: 'ricardo93',
    server: 'localhost',
    database: 'Locations',
    port: 49699
};

//What will be shown at root
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/addview', function(req,res){
    res.sendFile(path.join(__dirname + '/pages/add.html'));
})

app.get('/add', (req,res) =>{
    res.sendFile(path.join(__dirname + '/pages/add.html'));
})

app.post('/add',function(req,res){
    sql.connect(config, function(err){
        if(err) console.log(err);
        let sqlRequest = new sql.Request();
        let new_name = req.body.new_name;
        let new_distance = req.body.new_distance;
        let new_cost = req.body.new_cost;
        let sqlQuery = "Insert into Destinies (Name, Distance, Costs) Values ('"+new_name+"','"+new_distance+"','"+new_cost+"')";
        sqlRequest.query(sqlQuery, function(err,data){
            res.send('<script> alert("Successfully added!"); window.location.href="/add"; </script>');
            sql.close();
        });
    });
});

app.post('/show', function(req,res){
    sql.connect(config, function(err){
        if(err) console.log(err);
        let sqlRequest = new sql.Request();
        let sqlQuery = 'Select * from Destinies';
        sqlRequest.query(sqlQuery, function(err,data){
            let info = JSON.stringify(data);
            console.log(info);
            res.send(data)
            sql.close();
        });
    });
})

app.get('/deleteview',(req,res)=>{
    res.sendFile(path.join(__dirname + '/pages/delete.html'));
})

app.get('/delete',(req,res)=>{
    res.sendFile(path.join(__dirname + '/pages/delete.html'));
})

app.post('/delete',(req,res) =>{
    let country = req.body.country;
    console.log(country);
    sql.connect(config, function(err){
        if(err) console.log(err);
        let sqlRequest = new sql.Request();
        let sqlQuery = "Delete from Destinies where Name = ('"+country+"')";
        sqlRequest.query(sqlQuery, function(err,data){
            if(err){
                res.send('<script> alert("Error"); window.location.href="/delete"; </script>')
            }else{
                res.send('<script> alert("Successfully deleted!"); window.location.href="/delete"; </script>')
            }
            sql.close();
        });
    });

})

//Type http:/localhost:5000 at the browser to access the root
const webser = app.listen(5000, function(){
    console.log("The webserver is running at 5000");
});
