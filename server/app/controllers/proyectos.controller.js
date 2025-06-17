const Proyecto = require("../models/proyectos.model");

// Crear un nuevo proyecto
exports.createProyecto = (req, res) => {
  // Validar que el cuerpo de la petición no esté vacío
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
  }

  // Desestructuramos las propiedades que esperamos
  const {
    titulo,
    descripcion,
    categoria,
    imagen_url,
    es_destacado,
    fecha_inicio,
    fecha_fin,
    meta_financiacion,
    recaudado,
    inversores,
    id_usuario,
    sitio_web,
    correo,
    telefono,
    ubicacion,
    sobre_proyecto,
    inversion_minima,
    retorno_minimo,
    retorno_maximo,
    plazo_de,
    plazo_hasta

  } = req.body;

  // Creamos una nueva instancia de Proyecto
  const proyecto = new Proyecto({
    titulo,
    descripcion,
    categoria,
    imagen_url,
    es_destacado,
    fecha_inicio,
    fecha_fin,
    meta_financiacion,
    recaudado,
    inversores,
    id_usuario,
    sitio_web,
    correo,
    telefono,
    ubicacion,
    sobre_proyecto,
    inversion_minima,
    retorno_minimo,
    retorno_maximo,
    plazo_de,
    plazo_hasta
  });

  // Guardamos en la base de datos
  Proyecto.save(proyecto, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el proyecto"
      });
    }
    res.send(data);
  });
};

// Obtener todos los proyectos de un usuario
exports.getAllMyProjects = (req, res) => {

  Proyecto.getByUsuario(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron proyectos para el usuario con id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar proyectos para el usuario con id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};
// Obtener todos los proyectos de un usuario
exports.getAllProjects = (req, res) => {

  Proyecto.getAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron proyectos para el usuario con id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar proyectos para el usuario con id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};
// Obtener todos los proyectos destacados
exports.getAllProjectsDestacados = (req, res) => {

  Proyecto.getAllDestacados((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron proyectos destacados.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar proyectos destacados.`
      });
    }
    res.send(data);
  });
};

// Obtener proyecto por ID
exports.getProjectById = (req, res) => {
  Proyecto.getById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron proyectos para el id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar proyectos para el id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};

// Actualizar inversión de un proyecto
exports.updateInversion = (req, res) => {
  // Validamos que venga el monto en el body
  if (!req.body || typeof req.body.monto === "undefined") {
    return res.status(400).send({
      message: "Se requiere el monto a invertir"
    });
  }

  const id = req.params.id;
  // Convertimos a número en caso de que venga como string
  const monto = parseFloat(req.body.monto);

  // Llamamos al método estático del modelo que sumará el monto y aumentará inversores
  Proyecto.updateInversión(id, monto, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Proyecto no encontrado con id ${id}.`
        });
      }
      return res.status(500).send({
        message: `Error al actualizar la inversión del proyecto con id ${id}.`
      });
    }
    // Si todo sale bien, devolvemos el objeto del proyecto ya con recaudado e inversores actualizados
    res.send(data);
  });
};
