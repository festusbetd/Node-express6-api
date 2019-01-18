const express = require('express');
const expressjwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtCheck = expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://authorsapi2.auth0.com/.well-known/jwks.json"
    }),
    audience: 'udemy-api',
    issuer: "https://authorsapi2.auth0.com/",
    algorithms: ['RS256']
});

const app = express();

app.get("/public",(req,res) =>{
         res.status(200).send("Hello public");
});

app.get("/private",jwtCheck,(req,res) =>{
         res.status(200).send("Hello private");
});
app.get("*",(req,res) =>{
         res.sendStatus(404);
});

app.listen(8888,() => console.log("API started on port 8888"))