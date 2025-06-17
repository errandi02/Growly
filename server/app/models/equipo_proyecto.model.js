const db = require("./db.js");

// Constructor
const EquipoProyecto = function(equipo) {
  this.nombre             = equipo.nombre;
  this.cargo              = equipo.cargo;
  this.descripcion          = equipo.descripcion;
  this.proyecto_id         = equipo.proyecto_id;
};



//Guardar Miembro de Equipo de un Proyecto
EquipoProyecto.save = (newEquipo, result) => {
    const query = `
      INSERT INTO equipo_fundador 
      (proyecto_id, nombre, cargo, descripcion) VALUES (?)
    `;
    const values = [
        newEquipo.proyecto_id,
        newEquipo.nombre,
        newEquipo.cargo,
        newEquipo.descripcion
    ];
  
    db.query(query, [values], (err, res) => {
      if (err) {
        console.error("Error al insertar proyecto:", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newEquipo });
    });
  };
  

// Obtiene todos el equipo
EquipoProyecto.getByIdProyecto = (proyecto_id, result) => {
    const sql = `SELECT * FROM equipo_fundador WHERE proyecto_id = ?`;
    db.query(sql, [proyecto_id], (err, res) => {
      if (err) {
        console.error("Error al obtener miembro:", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
      // No encontró proyectos para ese usuario
      result({ kind: "not_found" }, null);
    });
  };

  module.exports = EquipoProyecto;