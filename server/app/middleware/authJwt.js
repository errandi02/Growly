const express = require("express");
const jwt = require("jsonwebtoken");


const verifyAdmin = (req, res, next) =>{
    const token = req.cookies.token;
    if (!token) {
      // 401 = Unauthorized (no viene token)
      return res.status(401).json({ message: "You are not authenticated." });
    }
  
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        // 401 = Unauthorized (token inválido o expirado)
        return res.status(401).json({ message: "Token not ok" });
      }
  
 
      if (decoded.role_id == 1) { //Admin
        req.role_id = decoded.role_id;
        next();
      } else {
        // 403 = Forbidden (token válido pero rol no permitido)
        return res.status(403).json({ message: "Not Admin" });
      }
    });
}
const verifyEmprendedor = (req, res, next) =>{
    const token = req.cookies.token;
    if (!token) {
      // 401 = Unauthorized (no viene token)
      return res.status(401).json({ message: "You are not authenticated." });
    }
  
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        // 401 = Unauthorized (token inválido o expirado)
        return res.status(401).json({ message: "Token not ok" });
      }
  
 
      if (decoded.role_id == 3) { // Emprendedor
        req.role_id = decoded.role_id;
        next();
      } else {
        // 403 = Forbidden (token válido pero rol no permitido)
        return res.status(403).json({ message: "Not Admin" });
      }
    });
  }

  const verifyInversor = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      // 401 = Unauthorized (no viene token)
      return res.status(401).json({ message: "You are not authenticated." });
    }
  
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        // 401 = Unauthorized (token inválido o expirado)
        return res.status(401).json({ message: "Token not ok" });
      }
  
 
      if (decoded.role_id == 2) { // Inversor
        req.role_id = decoded.role_id;
        next();
      } else {
        // 403 = Forbidden (token válido pero rol no permitido)
        return res.status(403).json({ message: "Not Inversor" });
      }
    });
  };
  const verifyEmprendedorOrInversor = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated." });
    }
  
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token not ok" });
      }
  
      if (decoded.role_id === 2 || decoded.role_id === 3) {
        req.role_id = decoded.role_id;
        next();
      } else {
        return res.status(403).json({ message: "Not authorized" });
      }
    });
  };
  const AuthJwt ={
    verifyAdmin,
    verifyEmprendedor,
    verifyInversor,
    verifyEmprendedorOrInversor
  }

  module.exports = AuthJwt;

