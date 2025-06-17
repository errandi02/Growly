const bcrypt = require('bcrypt');
const { hash } = bcrypt;
const db = require("./db.js");
const salt = 10;
const jwt = require('jsonwebtoken')

const Experiencia = function(exp) {
  //this.id             = exp.id;
  this.usuario_id         = exp.usuario_id;
  this.nombre_empresa    = exp.nombre_empresa;
  this.url_logo_empresa = exp.url_logo_empresa;
  this.puesto       = exp.puesto;
  this.tipo_empleo = exp.tipo_empleo;
  this.fecha_inicio      = exp.fecha_inicio;
  this.fecha_fin        = exp.fecha_fin;
  this.en_curso     = !!exp.en_curso;
  this.ubicacion       = exp.ubicacion;
  this.descripcion    = exp.descripcion;
  this.creado_en      = exp.creado_en;
  this.actualizado_en      = exp.actualizado_en;
};


Experiencia.save = (newExperiencia, result) => {
  const query = `INSERT INTO experiencias_laborales (usuario_id,nombre_empresa,url_logo_empresa,puesto,tipo_empleo,fecha_inicio, fecha_fin,en_curso,ubicacion,descripcion,creado_en,actualizado_en) VALUES (?)`;
  const values = [
    //newExperiencia.id,
    newExperiencia.usuario_id,
    newExperiencia.nombre_empresa,
    newExperiencia.url_logo_empresa,
    newExperiencia.puesto,
    newExperiencia.tipo_empleo,
    newExperiencia.fecha_inicio,
    newExperiencia.fecha_fin,
    newExperiencia.en_curso,
    newExperiencia.ubicacion,
    newExperiencia.descripcion,
    newExperiencia.creado_en,
    newExperiencia.actualizado_en
  ];

  db.query(query, [values], (err, res) => {
    if (err) {
     
      console.log("Error al insertar experiencia:", err);
      result(err, null);
      return;
    }
    // devolvemos el id generado junto con el resto de datos
    result(null, { id: res.insertId, ...newExperiencia });
  });
};

Experiencia.updateById = (id, updatedExperiencia, result) => {
  const query = `
    UPDATE experiencias_laborales
    SET 
      usuario_id         = ?,
      nombre_empresa     = ?,
      url_logo_empresa   = ?,
      puesto             = ?,
      tipo_empleo        = ?,
      fecha_inicio       = ?,
      fecha_fin          = ?,
      en_curso           = ?,
      ubicacion          = ?,
      descripcion        = ?,
      actualizado_en     = ?
    WHERE id = ?
  `;
  const values = [
    updatedExperiencia.usuario_id,
    updatedExperiencia.nombre_empresa,
    updatedExperiencia.url_logo_empresa,
    updatedExperiencia.puesto,
    updatedExperiencia.tipo_empleo,
    updatedExperiencia.fecha_inicio,
    updatedExperiencia.fecha_fin,
    updatedExperiencia.en_curso,
    updatedExperiencia.ubicacion,
    updatedExperiencia.descripcion,
    updatedExperiencia.actualizado_en,
    id
  ];

  db.query(query, values, (err, res) => {
    if (err) {
      console.log("Error al actualizar experiencia:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // No se encontró la experiencia con ese ID
      result({ kind: "not_found" }, null);
      return;
    }
    // Devolver el ID y los datos actualizados
    result(null, { id: id, ...updatedExperiencia });
  });
};

Experiencia.findById = (id_usuario, result) => {
  db.query(
    'SELECT * FROM experiencias_laborales WHERE usuario_id = ?',
    [id_usuario],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      }

      if (res.length) {
        console.log("found experiencias for user: ", res);
        return result(null, res);      // <-- aquí devolvemos TODO el array
      }

      // no encontró ninguna experiencia
      result({ kind: "not_found" }, null);
    }
  );
};
Experiencia.findExperienciaById = (id_usuario, result) => {
  db.query(
    'SELECT * FROM experiencias_laborales WHERE id = ?',
    [id_usuario],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      }

      if (res.length) {
        console.log("found experiencias for id: ", res);
        return result(null, res);      // <-- aquí devolvemos TODO el array
      }

      // no encontró ninguna experiencia
      result({ kind: "not_found" }, null);
    }
  );
};

Experiencia.deleteById = (id_experiencia, result) => {
  db.query(
    'DELETE FROM experiencias_laborales WHERE id = ?',
    [id_experiencia],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      }

      if (res.affectedRows == 0) {
        // No se encontró experiencia con el ID especificado
        return result({ kind: "not_found" }, null);
      }

      console.log("Deleted experience with id: ", id_experiencia);
      return result(null, res);
    }
  );
};

module.exports = Experiencia;
