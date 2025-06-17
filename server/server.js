const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

const verifyUser = (req, res, next) =>{
  const token = req.cookies.token; 
  if(!token){
    return res.json({Result : "You are not authenticated."});
  }else{

    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if(err){
        return res.json({Error: "Token not ok"});
      }else{

        req.name = decoded.name;
        req.id = decoded.id;
        req.email = decoded.email;
        req.role_id = req.role_id;
        req.profesion = decoded.profesion;
        //console.log("El token es:"+req.profesion);
        next();
      }
    })
  }
}

var corsOptions = {
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Cabeceras permitidas
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", verifyUser, (req, res) => {
 
  return res.json({Status : "Success", id: req.id, name: req.name, role_id: req.role_id, email: req.email, profesion: req.profesion});
});
app.get("/logout", (req, res) => {
  
  res.clearCookie('token');
  return res.json({Status: "Success"});
});


app.listen(8080, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});

require("./app/routes/user.routes.js")(app);


