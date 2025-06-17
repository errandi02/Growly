const bcrypt = require('bcrypt');
const db = require("./db.js");


const Educacion = function(ed) {
  //this.id                     = ed.id;
  this.usuario_id             = ed.usuario_id;
  this.nombre_institucion     = ed.nombre_institucion;
  this.url_logo_institucion   = ed.url_logo_institucion;
  this.grado                  = ed.grado;
  this.campo_estudio          = ed.campo_estudio;
  this.fecha_inicio           = ed.fecha_inicio;
  this.fecha_fin              = ed.fecha_fin;
  this.descripcion            = ed.descripcion;
  this.creado_en              = ed.creado_en;
  this.actualizado_en         = ed.actualizado_en;
};

Educacion.save = (newEducacion, result) => {
  const query = `INSERT INTO educacion ( usuario_id, nombre_institucion, url_logo_institucion, grado, campo_estudio, fecha_inicio, fecha_fin, descripcion, creado_en, actualizado_en ) VALUES (?);`;
  const values = [
    newEducacion.usuario_id,
    newEducacion.nombre_institucion,
    newEducacion.url_logo_institucion,
    newEducacion.grado,
    newEducacion.campo_estudio,
    newEducacion.fecha_inicio,
    newEducacion.fecha_fin,
    newEducacion.descripcion,
    newEducacion.creado_en,
    newEducacion.actualizado_en
  ];

  db.query(query, [values], (err, res) => {
    if (err) {
     
      console.log("Error al insertar educacion:", err);
      result(err, null);
      return;
    }
    // devolvemos el id generado junto con el resto de datos
    result(null, { id: res.insertId, ...newEducacion });
  });
};

Educacion.updateById = (id, updatedEducacion, result) => {
  console.log("El id que se busca es el "+id);
  const query = `
    UPDATE educacion
    SET 
      usuario_id             = ?,
      nombre_institucion     = ?,
      url_logo_institucion   = ?,
      grado                  = ?,
      campo_estudio          = ?,
      fecha_inicio           = ?,
      fecha_fin              = ?,      
      descripcion            = ?,
      creado_en              = ?,
      actualizado_en         = ?
    WHERE id = ?
  `;
  const values = [
    updatedEducacion.usuario_id,
    updatedEducacion.nombre_institucion,
    updatedEducacion.url_logo_institucion,
    updatedEducacion.grado,
    updatedEducacion.campo_estudio,
    updatedEducacion.fecha_inicio,
    updatedEducacion.fecha_fin,
    updatedEducacion.descripcion,
    updatedEducacion.creado_en,
    updatedEducacion.actualizado_en,
    id
  ];

  console.log(values);

  db.query(query, values, (err, res) => {
    if (err) {
      console.log("Error al actualizar eduacion:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // No se encontró la educacion con ese ID
      result({ kind: "not_found" }, null);
      return;
    }
    // Devolver el ID y los datos actualizados
    result(null, { id: id, ...updatedEducacion });
  });
};


Educacion.findById = (id_usuario, result) => {
  db.query(
    'SELECT * FROM educacion WHERE usuario_id = ?',
    [id_usuario],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      }

      if (res.length) {
        console.log("found educacion for user: ", res);
        return result(null, res);      // <-- aquí devolvemos TODO el array
      }

      // no encontró ninguna educacion
      result({ kind: "not_found" }, null);
    }
  );
};
Educacion.findEducacionById = (id_usuario, result) => {
  db.query(
    'SELECT * FROM educacion WHERE id = ?',
    [id_usuario],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      }

      if (res.length) {
        console.log("found educacion for id: ", res);
        return result(null, res);      // <-- aquí devolvemos TODO el array
      }

      // no encontró ninguna educacion
      result({ kind: "not_found" }, null);
    }
  );
};

Educacion.deleteById = (id_educacion, result) => {
  db.query(
    'DELETE FROM educacion WHERE id = ?',
    [id_educacion],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      }

      if (res.affectedRows == 0) {
        // No se encontró educacion con el ID especificado
        return result({ kind: "not_found" }, null);
      }

      console.log("Deleted educacion with id: ", id_educacion);
      return result(null, res);
    }
  );
};

module.exports = Educacion;
