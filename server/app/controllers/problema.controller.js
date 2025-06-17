const Problema = require("../models/problema.model");

// Crear un nuevo Problema
exports.createProblema = (req, res) => {
  //Validar que el cuerpo de la petición no esté vacío
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
  }


  // Creamos una nueva instancia de Problema
  const problem = new Problema({
    problema: req.body.problema ,
    id_proyecto: req.body.id_proyecto
  });
  
  // Guardamos en la base de datos
  Problema.save(problem, (err, data) => {
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
exports.getAllMyProblemsByProyectoId = (req, res) => {

  Problema.getMyProblemsByProyectoId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron problemas para el usuario con id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar problemas para el usuario con id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};
