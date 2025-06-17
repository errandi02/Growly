
const Experiencia = require("../models/experiencia_user.model");


exports.createExperiencia = (req, res) => {
  // Validar petición
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const {
    //id,
    usuario_id,
    nombre_empresa,
    url_logo_empresa,
    puesto,
    tipo_empleo,
    fecha_inicio,
    fecha_fin,
    en_curso,
    ubicacion,
    descripcion
  } = req.body;

  // Crear una nueva instancia de Experiencia con los datos recibidos
  const experiencia = new Experiencia({
   // id,
    usuario_id,
    nombre_empresa,
    url_logo_empresa,
    puesto,
    tipo_empleo,
    fecha_inicio,
    fecha_fin,
    en_curso,
    ubicacion,
    descripcion,
    // Si tu tabla usa CURRENT_TIMESTAMP para creado_en/actualizado_en puedes omitir estos campos
    creado_en: req.body.creado_en,
    actualizado_en: req.body.actualizado_en
  });

  // Guardar en la base de datos
  Experiencia.save(experiencia, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Experiencia."
      });
    }
    res.send(data);
  });
};
// Actualizar una Experiencia por su ID
exports.update = (req, res) => {
  // Validar que venga contenido en el body
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
  }

  const id = parseInt(req.params.id, 10);

  // Construir el objeto experiencia con los datos recibidos
  const experiencia = {
    usuario_id:       req.body.usuario_id,
    nombre_empresa:   req.body.nombre_empresa,
    url_logo_empresa: req.body.url_logo_empresa,
    puesto:           req.body.puesto,
    tipo_empleo:      req.body.tipo_empleo,
    fecha_inicio:     req.body.fecha_inicio,
    fecha_fin:        req.body.fecha_fin,
    en_curso:         req.body.en_curso,
    ubicacion:        req.body.ubicacion,
    descripcion:      req.body.descripcion,
    actualizado_en:   new Date()   // sello de tiempo actual
  };

  Experiencia.updateById(id, experiencia, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        // No existe la experiencia con ese ID
        return res.status(404).send({
          message: `No se encontró la experiencia con id ${id}.`
        });
      } else {
        // Otro error al actualizar
        return res.status(500).send({
          message: err.message || `Error al actualizar la experiencia con id ${id}.`
        });
      }
    }
    // Devolver la experiencia actualizada
    res.send(data);
  });
};
// Find a single Experience by Id
exports.findById = (req, res) => {
  Experiencia.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Find a single Experience by Id
exports.findExperienciaById = (req, res) => {
  Experiencia.findExperienciaById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Experience with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Experience with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Delete a single Experience by ID
exports.deleteById = (req, res) => {
  Experiencia.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró experiencia con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al eliminar experiencia con id " + req.params.id
        });
      }
    } else res.send({ message: "Experiencia eliminada exitosamente!" });
  });
};








