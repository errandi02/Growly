const db = require("./db.js");

// Constructor
const Inversion = function(inversion) {
  this.id_usuario         = inversion.id_usuario;
  this.id_proyecto      = inversion.id_proyecto;

};

// Inserta un nuevo proyecto
Inversion.save = (newInversion, result) => {
  const query = `
    INSERT INTO Inversiones 
      (id_usuario, id_proyecto)
    VALUES (?)
  `;
  const values = [
    newInversion.id_usuario,
    newInversion.id_proyecto,
  ];

  db.query(query, [values], (err, res) => {
    if (err) {
      console.error("Error al insertar problema:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newInversion});
  });
};

// Verifica si existe al menos una inversión de un usuario para un proyecto concreto
Inversion.getMyInvestmentsByUserIdProyectoId = (id_usuario, id_proyecto, result) => {
  const sql = `SELECT * FROM Inversiones WHERE id_usuario = ? AND id_proyecto = ?`;
  db.query(sql, [id_usuario, id_proyecto], (err, res) => {

    if (err) {
      console.error("Error al obtener inversiones:", err);
      // Propaga el error al callback
      return result(err, null);
    }
    // Si hay al menos una fila, devolvemos true
    if (res.length) {
      return result(null, true);
    }
    // Si no se encontró ninguna fila, devolvemos false
    return result(null, false);
  });
};
// Obtiene todos los proyectos de un usuario
Inversion.getMyInvestmentsByUserId = (id, result) => {
  const sql = `SELECT id_proyecto FROM Inversiones WHERE id_usuario = ?`;
 
  db.query(sql, [id], (err, res) => {
    if (err) {
      console.error("Error al obtener inversiones:", err);
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


  

module.exports = Inversion;
