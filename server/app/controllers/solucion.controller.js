const Solucion = require("../models/solucion.model");
// Crear un nuevo Problema
exports.createSolucion = (req, res) => {
  //Validar que el cuerpo de la petición no esté vacío
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
  }

  // Desestructuramos las propiedades que esperamos


  // Creamos una nueva instancia de Problema
  const sol = new Solucion({
    solucion :req.body.solucion ,
    id_proyecto: req.body.id_proyecto,
    solucion_desc : req.body.solucion_desc,
  
  });
  // Guardamos en la base de datos
  Solucion.save(sol, (err, data) => {
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
exports.getAllMySolucionesByProyectoId = (req, res) => {
  Solucion.getSolucionByProyectoId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron soluciones para el proyecto con id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar soluciones para el proyecto con id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};
