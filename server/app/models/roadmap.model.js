const db = require("./db.js");

// Constructor
const Roadmap = function(roadmap) {
  this.Titulo           = roadmap.Titulo;
  this.Fecha            = roadmap.Fecha;
  this.Descripcion      = roadmap.Descripcion;
  this.id_proyecto      = roadmap.id_proyecto
};

// Inserta un nuevo Roadmap de proyecto
Roadmap.save = (newRoadmap, result) => {
  const query = `
    INSERT INTO Roadmap_Proyecto 
      (Titulo, Fecha, Descripcion, id_proyecto)
    VALUES (?)
  `;
  const values = [
    newRoadmap.Titulo,
    newRoadmap.Fecha,
    newRoadmap.Descripcion,
    newRoadmap.id_proyecto,
  ];

  db.query(query, [values], (err, res) => {
    if (err) {
      console.error("Error al insertar problema:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newRoadmap});
  });
};

// Obtiene todos los Roadmap de un usuario
Roadmap.getMyRoadmapByProyectoId = (proyectoId, result) => {
  const sql = `SELECT * FROM Roadmap_Proyecto WHERE id_proyecto = ?`;
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

  

module.exports = Roadmap;
