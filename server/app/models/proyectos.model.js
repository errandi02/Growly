const db = require("./db.js");

// Constructor
const Proyecto = function(proyecto) {
  this.titulo             = proyecto.titulo;
  this.descripcion        = proyecto.descripcion;
  this.categoria          = proyecto.categoria;
  this.imagen_url         = proyecto.imagen_url   || null;
  this.es_destacado       = proyecto.es_destacado || false;
  this.fecha_inicio       = proyecto.fecha_inicio || new Date();
  this.fecha_fin          = proyecto.fecha_fin    || null;
  this.meta_financiacion  = proyecto.meta_financiacion || 0;
  this.recaudado          = proyecto.recaudado    || 0;
  this.inversores         = proyecto.inversores   || 0;
  this.id_usuario         = proyecto.id_usuario;
  this.sitio_web          = proyecto.sitio_web;
  this.correo             = proyecto.correo;
  this.telefono           = proyecto.telefono;
  this.ubicacion          = proyecto.ubicacion;
  this.sobre_proyecto     = proyecto.sobre_proyecto;
  this.inversion_minima   = proyecto.inversion_minima;
  this.retorno_minimo     = proyecto.retorno_minimo;
  this.retorno_maximo     = proyecto.retorno_maximo;
  this.plazo_de           = proyecto.plazo_de;
  this.plazo_hasta        = proyecto.plazo_hasta;
};

// Inserta un nuevo proyecto
Proyecto.save = (newProyecto, result) => {
  const query = `
    INSERT INTO Proyectos 
      (titulo, descripcion, categoria, imagen_url, es_destacado,
       fecha_inicio, fecha_fin, meta_financiacion, recaudado,
       inversores, id_usuario, sitio_web, correo, telefono, ubicacion,
       sobre_proyecto, inversion_minima, retorno_minimo, retorno_maximo,
       plazo_de, plazo_hasta)
    VALUES (?)
  `;
  const values = [
    newProyecto.titulo,
    newProyecto.descripcion,
    newProyecto.categoria,
    newProyecto.imagen_url,
    newProyecto.es_destacado,
    newProyecto.fecha_inicio,
    newProyecto.fecha_fin,
    newProyecto.meta_financiacion,
    newProyecto.recaudado,
    newProyecto.inversores,
    newProyecto.id_usuario,
    newProyecto.sitio_web,
    newProyecto.correo,
    newProyecto.telefono,
    newProyecto.ubicacion,
    newProyecto.sobre_proyecto,
    newProyecto.inversion_minima,
    newProyecto.retorno_minimo,
    newProyecto.retorno_maximo,
    newProyecto.plazo_de,
    newProyecto.plazo_hasta,
  ];

  db.query(query, [values], (err, res) => {
    if (err) {
      console.error("Error al insertar proyecto:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newProyecto });
  });
};

// Obtiene todos los proyectos de un usuario
Proyecto.getByUsuario = (userId, result) => {
  const sql = `SELECT * FROM Proyectos WHERE id_usuario = ?`;
  db.query(sql, [userId], (err, res) => {
    if (err) {
      console.error("Error al obtener proyectos:", err);
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
// Obtiene todos los proyectos de un usuario
Proyecto.getAll = (result) => {
    const sql = `SELECT * FROM Proyectos`;
    db.query(sql, (err, res) => {
      if (err) {
        console.error("Error al obtener proyectos:", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
    });
  };

  // Obtiene todos los proyectos de un usuario
Proyecto.getAllDestacados = (result) => {
    const sql = `SELECT * FROM Proyectos WHERE es_destacado=1`;
    db.query(sql, (err, res) => {
      if (err) {
        console.error("Error al obtener proyectos destacados:", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
    });
  };

  // Obtiene el proyecto por id
Proyecto.getById = (id, result) => {
    const sql = `SELECT * FROM Proyectos WHERE id = ?`;
    db.query(sql, [id], (err, res) => {
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
  
  Proyecto.updateInversión = (id, monto, result) => {
    // Primero, intentamos hacer el UPDATE
    const sql = `
      UPDATE Proyectos 
      SET recaudado = recaudado + ?, 
          inversores = inversores + 1 
      WHERE id = ?
    `;
    db.query(sql, [monto, id], (err, res) => {
      if (err) {
        console.error("Error al actualizar inversión:", err);
        result(err, null);
        return;
      }
      // Si no hubo filas afectadas, no existe ese proyecto
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      // Tras actualizar, obtener el proyecto completo actualizado
      Proyecto.getById(id, (err2, rows) => {
        if (err2) {
          // Propagamos cualquier error de getById
          result(err2, null);
          return;
        }
        // rows es un arreglo; devolvemos el primer elemento como objeto
        result(null, rows[0]);
      });
    });
  };
module.exports = Proyecto;
