const db = require("./db.js");

// Constructor
const Problema = function(problema) {
  this.problema        = problema.problema;
  this.id_proyecto          = problema.id_proyecto;

};

// Inserta un nuevo proyecto
Problema.save = (newProblema, result) => {
  const query = `
    INSERT INTO Problema 
      (problema, id_proyecto)
    VALUES (?)
  `;
  const values = [
    newProblema.problema,
    newProblema.id_proyecto,
  ];

  db.query(query, [values], (err, res) => {
    if (err) {
      console.error("Error al insertar problema:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newProblema});
  });
};

// Obtiene todos los proyectos de un usuario
Problema.getMyProblemsByProyectoId = (proyectoId, result) => {
  const sql = `SELECT * FROM Problema WHERE id_proyecto = ?`;
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

  

module.exports = Problema;
