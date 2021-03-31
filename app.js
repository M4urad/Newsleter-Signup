const express = require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https =  require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
   var firstname=req.body.fName;
   var lastname=req.body.Lname;
   var email=req.body.email;

   var data = {
       members : [
         {
          email_address : email,
          status : "subscribed",
          merge_fields : {
            FNAME :  firstname,
            LNAME :  lastname
          }
        }
       ]
   };
   const jsonData=JSON.stringify(data);
   const url = "https://us1.api.mailchimp.com/3.0/lists/5f63b95e23";
   const options = {
         method : "POST",
         auth : "Murad1:0b8632f44d26f74c3871aad6c87f1589-us1"
   }

   const request=https.request(url,options,function(response){

     if(response.statusCode === 200){
       res.sendFile(__dirname + "/success.html");
     }
     else{
       res.sendFile(__dirname + "/failure.html");
     }

     response.on("data",function(data){
       console.log(JSON.parse(data));
     })
   })
   request.write(jsonData);
   request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server port 3000 is running");
});


//0b8632f44d26f74c3871aad6c87f1589-us1
//5f63b95e23
