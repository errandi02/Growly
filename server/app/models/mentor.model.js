const db = require("./db.js");

// Constructor
const Mentor = function(mentor) {
  this.especializacion      = mentor.especializacion;
  this.descripcion      = mentor.descripcion;
  this.id_usuario      = mentor.id_usuario
};

// Inserta un nuevo Roadmap de proyecto
Mentor.save = (newMentor, result) => {
  const query = `
    INSERT INTO mentor 
      (especializacion, descripcion, id_usuario)
    VALUES (?)
  `;
  const values = [
    newMentor.especializacion,
    newMentor.descripcion,
    newMentor.id_usuario,
  ];

  db.query(query, [values], (err, res) => {
    if (err) {
      console.error("Error al insertar mentor:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newMentor});
  });
};


Mentor.getMentorByUserId = (usuarioId, result) => {
  const sql = `SELECT * FROM mentor WHERE id_usuario = ?`;
  db.query(sql, [usuarioId], (err, res) => {
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

  

module.exports = Mentor;
