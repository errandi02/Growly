const db = require("./db.js");

// Constructor
const Solucion = function(solucion) {
  this.solucion        = solucion.solucion;
  this.id_proyecto     = solucion.id_proyecto;
  this.solucion_desc   = solucion.solucion_desc;
};

// Inserta
Solucion.save = (newSolucion, result) => {
    const query = `
      INSERT INTO Solucion 
        (solucion,  id_proyecto, solucion_desc)
      VALUES (?)
    `;
    const values = [
      newSolucion.solucion,
      newSolucion.id_proyecto,
      newSolucion.solucion_desc
    ];

    db.query(query, [values], (err, res) => {
      if (err) {
        console.error("Error al insertar problema:", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newSolucion});
    });
};

// Obtiene todos los solucion de un proyecto
Solucion.getSolucionByProyectoId = (solucionId, result) => {
  const sql = `SELECT * FROM Solucion WHERE id_proyecto = ?`;
  db.query(sql, [solucionId], (err, res) => {
    if (err) {
      console.error("Error al obtener solucion:", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    // No encontró solucion para ese usuario
    result({ kind: "not_found" }, null);
  });
};

  

module.exports = Solucion;
