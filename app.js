const express = require('express');
require('dotenv').config();
const app = express();
var con = require("./connection");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("Server is up and running ");
})   

app.post("/", function(req,res){``
    var name= req.body.name;
    var age = req.body.age ;
    var departure = req.body.departure;
    var date = req.body.departure_Date;
    var classType = req.body.class;
    var destination = req.body.destination;
    var passengersNo = req.body.passengersCount;
    console.log(name,age);
    var sql = 'INSERT into test (Name,Age,Departure, Departure_Date, class, destination, No_of_passengers) values ?;';
    var values = [[name,age,departure,date,classType, destination, passengersNo]];

    con.query(sql, [values],function(err,result){
        if (err) throw err;
        console.log("Data Uploaded.");
        res.redirect('/');
    })
})


app.get("/", function(req,res){
    var sql = 'Select * from test;';
    con.query(sql, function(error,results){
        if (error) throw error;

        res.render("display",{ test: results});
    });
});

app.get("/update",function(req,res){
    con.connect(function(error){
        if (error) console.log(error);
        var sql = "select * from test where ticketId =?;";
        var id = req.query.id;
        con.query(sql,[id],function(error,result){
            if (error) console.log(error);
            res.render('update',{test: result})
        })
    })
});

app.post("/updateData", function(req,res){
    var id = req.body.id;
    var name= req.body.name;
    var age = req.body.age ;
    var departure = req.body.departure;
    var date = req.body.departure_Date;
    console.log(date);
    var classType = req.body.class;
    var destination = req.body.destination;
    var passengersNo = parseInt(req.body.passengersCount);
    console.log(name,age);
    var sql = "update test set Name=?, Age=?, Departure = ?,Departure_date = ?, class = ?, destination = ?,No_of_passengers =? where ticketId=?;";

    con.query(sql,[name,age,departure,date,classType,destination,passengersNo,id],function(error,result) {
        if (error) console.log(error);
        console.log("data updated");
        res.redirect("/")
    })
})
app.get("/delete",function(req,res){
    con.connect(function(err){
        if (err) console.log(err);
        var sql = "delete from test where ticketId=?";
        var id = req.query.id;
        con.query(sql,[id],function(error,result){
            if (error) console.log(error);
            res.redirect("/")
        })
    })
})