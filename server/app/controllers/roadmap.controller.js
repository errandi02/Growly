const Roadmap = require("../models/roadmap.model");
// Crear un nuevo Roadmap
exports.createRoadmap = (req, res) => {
  //Validar que el cuerpo de la petición no esté vacío
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
  }

  // Creamos una nueva instancia de Roadmap
  const sol = new Roadmap({
    Titulo: req.body.Titulo,
    Fecha: req.body.Fecha,
    Descripcion: req.body.Descripcion,
    id_proyecto: req.body.id_proyecto
  });
  console.log(req.body)
  // Guardamos en la base de datos
  Roadmap.save(sol, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la solucion"
      });
    }
    res.send(data);
  });
};

// Obtener todos los proyectos de un usuario
exports.getAllMyRoadmapByProyectoId = (req, res) => {
  Roadmap.getMyRoadmapByProyectoId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron roadmaps para el proyecto con id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar roadmaps para el proyecto con id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};
