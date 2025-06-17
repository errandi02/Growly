const Actualizacion = require("../models/actualizaciones.model");
// Crear un nuevo Roadmap
exports.createActualizacion = (req, res) => {
  //Validar que el cuerpo de la petición no esté vacío
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
  }

  // Creamos una nueva instancia de Roadmap
  const sol = new Actualizacion({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    id_proyecto: req.body.id_proyecto
  });

  // Guardamos en la base de datos
  Actualizacion.save(sol, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la actualizacion"
      });
    }
    res.send(data);
  });
};

// Obtener todas las actualizaciones de un usuario
exports.getAllMyActualizacionesByProyectoId = (req, res) => {
  Actualizacion.getMyActualizacionByProyectoId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron actualizaciones para el proyecto con id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar actualizaciones para el proyecto con id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};
