const db = require("./db.js");

// Constructor
const Follow = function(follow) {
  this.follower      = follow.follower;
  this.following      = follow.following
};

// Inserta un nuevo Follow de proyecto
Follow.save = (newFollow, result) => {
  const query = `
    INSERT INTO follow 
      (follower, following)
    VALUES (?)
  `;
  const values = [
    newFollow.follower,
    newFollow.following,

  ];

  db.query(query, [values], (err, res) => {
    if (err) {
      console.error("Error al insertar follow:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newFollow});
  });
};


Follow.getMyFollowings = (id, result) => {
  const sql = `SELECT following FROM follow WHERE follower = ?`;
  db.query(sql, [id], (err, res) => {
    if (err) {
      console.error("Error al obtener Follow:", err);
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

Follow.getMyFollowers = (id, result) => {
  const sql = `SELECT follower FROM follow WHERE following = ?`;
  db.query(sql, [id], (err, res) => {
    if (err) {
      console.error("Error al obtener Follow:", err);
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
  
// Elimina un Follow existente (unfollow) por IDs
Follow.unfollow = (follower, following, result) => {
  const query = `
    DELETE FROM follow
    WHERE follower = ? AND following = ?
  `;

  db.query(query, [follower, following], (err, res) => {
    if (err) {
      console.error("Error al eliminar follow:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // No se encontró ninguna fila que eliminar
      result(null, { message: "No se encontró la relación follow a eliminar." });
      return;
    }
    result(null, { message: "Unfollow realizado correctamente.", follower, following });
  });
};


module.exports = Follow;
