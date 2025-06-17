const bcrypt = require('bcrypt');
const { hash } = bcrypt;
const db = require("./db.js");
const salt = 10;
const jwt = require('jsonwebtoken')

// constructor
const User = function(user) {
  this.id = user.id;
  this.name = user.name;
  this.surname = user.surname;
  this.titulo_profesional = user.titulo_profesional;
  this.email = user.email;
  this.birth_date = user.birth_date;
  this.password = user.password;
  this.acerca_de = user.acerca_de;
  this.url_imagen_perfil = user.url_imagen_perfil;
  this.url_imagen_cabecera = user.url_imagen_cabecera;
  this.ciudad = user.ciudad;
  this.pais = user.pais;
  this.telefono = user.telefono;
  this.sitio_web = user.sitio_web;
  this.configuracion_privacidad = user.configuracion_privacidad;
  this.contador_conexiones = user.contador_conexiones;
  this.creado_en = user.creado_en;
  this.actualizado_en = user.actualizado_en;
  this.role_id        = user.role_id;
  this.isMentor       = user.isMentor;
};


User.create = (newUser, result) => {
  
  // Primero, hasheamos la contraseña antes de insertar el nuevo usuario
  bcrypt.hash(newUser.password.toString(), salt, (err, hashedPassword) => {
    if (err) {
      console.log("Error hashing the password:", err);
      return result({ Error: "Error hashing the password" }, null);
    }

    // Reemplazamos la contraseña original con la hasheada
    newUser.password = hashedPassword;
    newUser.isMentor = 0;
  
    // Ahora insertamos el usuario con la contraseña hasheada
    db.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("Error while inserting user:", err);
        result(err, null);
        return;
      }
    
      result(null, { id: res.insertId, ...newUser });
    });
 }); 
};

User.update = (id, user, result) => {
  // Si se desea cambiar la contraseña, primero la hasheamos

    const querySQL = "UPDATE user SET name = ?, surname = ?, email = ?, birth_date = ?, titulo_profesional = ?, acerca_de = ?, url_imagen_perfil = ?, url_imagen_cabecera = ?, ciudad = ?, pais = ?, telefono = ?, sitio_web = ?, configuracion_privacidad = ?, contador_conexiones = ?, creado_en = CURRENT_TIMESTAMP, actualizado_en = CURRENT_TIMESTAMP WHERE id = ?";
    // Si no se cambió la contraseña, solo actualizamos los otros datos
    db.query(
      querySQL,
      [
        user.name,
        user.surname,
        user.email,
        user.birth_date,
        user.titulo_profesional,
        user.acerca_de,
        user.url_imagen_perfil,
        user.url_imagen_cabezera,
        user.ciudad,
        user.pais,
        user.telefono,
        user.sitio_web,
        user.configuracion_privacidad,
        user.contador_conexiones,
        id
      ],
      (err, res) => {
        if (err) {
          console.log("Error while updating user:", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          // Si no se actualizó ningún usuario (es posible que no se encuentre el ID)
          result({ message: "User not found" }, null);
          return;
        }

        
        result(null, { id, ...user });
      }
    );
  
};
User.updateAcercaDe = (user, result) => {
  // Si se desea cambiar la contraseña, primero la hasheamos

    const querySQL = "UPDATE user SET acerca_de = ? WHERE id=?";
    // Si no se cambió la contraseña, solo actualizamos los otros datos
    const id=user.id;
    db.query(
      querySQL,
      [
        user.acerca_de,
        user.id
      ],
      (err, res) => {
        if (err) {
          console.log("Error while updating user:", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          // Si no se actualizó ningún usuario (es posible que no se encuentre el ID)
          result({ message: "User not found" }, null);
          return;
        }

        console.log("Updated user:", { id, ...user });
        result(null, { id, ...user });
      }
    );
  
};
User.updateIsMentor = (user, result) => {
  // Si se desea cambiar la contraseña, primero la hasheamos

    const querySQL = "UPDATE user SET isMentor = ? WHERE id=?";
    // Si no se cambió la contraseña, solo actualizamos los otros datos
    const id=user.id;
    db.query(
      querySQL,
      [
        user.isMentor,
        user.id
      ],
      (err, res) => {
        if (err) {
          console.log("Error while updating user:", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          // Si no se actualizó ningún usuario (es posible que no se encuentre el ID)
          result({ message: "User not found" }, null);
          return;
        }

        console.log("Updated user:", { id, ...user });
        result(null, { id, ...user });
      }
    );
  
};

User.login = (req, res) => {

  const sql = 'SELECT * FROM user WHERE email = ?';
  db.query(sql, [req.email], (err, data) => {
    if(err) return res.json({Error: 'Login error in server.'});
    if(data.length > 0){
      bcrypt.compare(req.password.toString(), data[0].password, (err, response) => {
          if(err) return res.json({Error: 'Password compare error.'});
          if(response){
            const id = data[0].id;
            const name = data[0].name;
            const profesion = data[0].titulo_profesional;
            const email = data[0].email;
            const role_id = data[0].role_id;
            const token = jwt.sign({name, id, profesion, email, role_id}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Result: 'Success.'});
          }else{
            return res.json({Error: 'Password does not match.'});
          }
      })
    }else{
      return res.json({Error: 'No email existed.'});
    }
  }) 

};

User.findById = (id, result) => {
  db.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return; 
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (name, result) => {
  let query = "SELECT * FROM user";  // Base query to get all users

  if (name) {
    query += " WHERE name LIKE ?";
    db.query(query, [`%${name}%`], (err, res) => {  // Proper query execution
      if (err) {
        console.log("Error while retrieving users", err);
        result(err, null);  // Pass the error to the callback
        return;
      }
      result(null, res);  // Pass the result to the callback
    });
  } else {
    db.query(query, (err, res) => {  // Query for all users
      if (err) {
        console.log("Error while retrieving users", err);
        result(err, null);  // Pass the error to the callback
        return;
      }
      result(null, res);  // Pass the result to the callback
    });
  }
};
User.getAllMentores = (name, result) => {
  let query = "SELECT * FROM user where isMentor=1";  // Base query to get all users

  if (name) {
    query += " WHERE name LIKE ?";
    db.query(query, [`%${name}%`], (err, res) => {  // Proper query execution
      if (err) {
        console.log("Error while retrieving users", err);
        result(err, null);  // Pass the error to the callback
        return;
      }
      result(null, res);  // Pass the result to the callback
    });
  } else {
    db.query(query, (err, res) => {  // Query for all users
      if (err) {
        console.log("Error while retrieving users", err);
        result(err, null);  // Pass the error to the callback
        return;
      }
      result(null, res);  // Pass the result to the callback
    });
  }
};

module.exports = User;
