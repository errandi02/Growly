const db = require("./db.js");

//Constructor de habilidad
const Habilidad = function(habilidad) {
    
    this.nombre = habilidad.nombre;
    this.usuario_id = habilidad.usuario_id;
}


Habilidad.create = (newHabilidad, result) =>{

    const query = `INSERT INTO habilidades(nombre, usuario_id) VALUES (?)`;

    const values = [
        newHabilidad.nombre,
        newHabilidad.usuario_id
    ];

    db.query(query, [values], (err,res)=>{
        if (err){
            console.log("Error while inserting habilidad:", err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newHabilidad});
    })

};

Habilidad.findById = (id_usuario, result) => {
    db.query(
      'SELECT * FROM habilidades WHERE usuario_id = ?',
      [id_usuario],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return result(err, null);
        }
  
        if (res.length) {
          console.log("found habilidades for user: ", res);
          return result(null, res);      // <-- aquí devolvemos TODO el array
        }
  
        // no encontró ninguna experiencia
        result({ kind: "not_found" }, null);
      }
    );
  };

  
  Habilidad.deleteById = (id_experiencia, result) => {
    db.query(
      'DELETE FROM habilidades WHERE id = ?',
      [id_experiencia],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return result(err, null);
        }
  
        if (res.affectedRows == 0) {
          // No se encontró experiencia con el ID especificado
          return result({ kind: "not_found" }, null);
        }
  
        console.log("Deleted habilidad with id: ", id_experiencia);
        return result(null, res);
      }
    );
  };

  Habilidad.findHabilidadById = (id_usuario, result) => {
    db.query(
      'SELECT * FROM habilidades WHERE id = ?',
      [id_usuario],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return result(err, null);
        }
  
        if (res.length) {
          console.log("found habilidad for id: ", res);
          return result(null, res);      // <-- aquí devolvemos TODO el array
        }
  
        // no encontró ninguna experiencia
        result({ kind: "not_found" }, null);
      }
    );
  };

  module.exports = Habilidad;