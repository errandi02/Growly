const db = require("./db.js");

// Constructor
const Actualizacion = function(roadmap) {
  this.titulo           = roadmap.titulo;
  this.descripcion      = roadmap.descripcion;
  this.id_proyecto      = roadmap.id_proyecto
};

// Inserta un nuevo Roadmap de proyecto
Actualizacion.save = (newRoadmap, result) => {
  const query = `
    INSERT INTO Actualizaciones_Proyecto 
      (titulo, descripcion, id_proyecto)
    VALUES (?)
  `;
  const values = [
    newRoadmap.titulo,
    newRoadmap.descripcion,
    newRoadmap.id_proyecto,
  ];

  db.query(query, [values], (err, res) => {
    if (err) {
      console.error("Error al insertar actualizacion:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newRoadmap});
  });
};

// Obtiene todos los proyectos de un usuario
Actualizacion.getMyActualizacionByProyectoId = (proyectoId, result) => {
  const sql = `SELECT * FROM Actualizaciones_Proyecto WHERE id_proyecto = ?`;
  db.query(sql, [proyectoId], (err, res) => {
    if (err) {
      console.error("Error al obtener proyecto:", err);
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

  

module.exports = Actualizacion;
