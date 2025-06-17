
const Educacion = require("../models/educacion_user.model");


exports.createEducacion = (req, res) => {
  // Validar petición
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const {
    //id,
    usuario_id,
    nombre_institucion,
    url_logo_institucion,
    grado,
    campo_estudio,
    fecha_inicio,
    fecha_fin,
    descripcion,
    creado_en,
    actualizado_en
  } = req.body;

  // Crear una nueva instancia de Educacion con los datos recibidos
  const educacion = new Educacion({
   // id,
    usuario_id,
    nombre_institucion,
    url_logo_institucion,
    grado,
    campo_estudio,
    fecha_inicio,
    fecha_fin,
    descripcion
  });

  // Guardar en la base de datos
  Educacion.save(educacion, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Educacion."
      });
    }
    res.send(data);
  });
};
// Actualizar una Educacion por su ID
exports.update = (req, res) => {
  // Validar que venga contenido en el body
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
  }

  const id = parseInt(req.params.id, 10);

  // Construir el objeto educacion con los datos recibidos
  const educacion = {
    usuario_id:       req.body.usuario_id,
    nombre_institucion:   req.body.nombre_institucion,
    url_logo_institucion: req.body.url_logo_institucion,
    grado:           req.body.grado,
    campo_estudio:      req.body.campo_estudio,
    fecha_inicio:     req.body.fecha_inicio,
    fecha_fin:        req.body.fecha_fin,
    descripcion:      req.body.descripcion,
    actualizado_en:   new Date()   // sello de tiempo actual
  };

  Educacion.updateById(id, educacion, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        // No existe la educacion con ese ID
        return res.status(404).send({
          message: `No se encontró la educacion con id ${id}.`
        });
      } else {
        // Otro error al actualizar
        return res.status(500).send({
          message: err.message || `Error al actualizar la educacion con id ${id}.`
        });
      }
    }
    // Devolver la educacion actualizada
    res.send(data);
  });
};
// Find a single Tutorial by Id
exports.findById = (req, res) => {
  Educacion.findById(req.params.id, (err, data) => {
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

// Find a single Tutorial by Id
exports.findEducacionById = (req, res) => {
  Educacion.findEducacionById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Educacion with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Educacion with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Delete a single Educacion by ID
exports.deleteById = (req, res) => {
  Educacion.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró educacion con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al eliminar educacion con id " + req.params.id
        });
      }
    } else res.send({ message: "Educacion eliminada exitosamente!" });
  });
};








