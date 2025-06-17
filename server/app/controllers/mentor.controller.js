const Mentor = require("../models/mentor.model");
// Crear un nuevo Mentor
exports.createMentor = (req, res) => {
  //Validar que el cuerpo de la petición no esté vacío
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
  }

  // Creamos una nueva instancia de Mentor
  const sol = new Mentor({
    especializacion: req.body.especializacion,
    descripcion: req.body.descripcion,
    id_usuario: req.body.id_usuario
  });
  console.log(req.body)
  console.log(sol);
  // Guardamos en la base de datos
  Mentor.save(sol, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear mentor"
      });
    }
    res.send(data);
  });
};

// Obtener todos los Mentor
exports.getMentorByUserId = (req, res) => {
  Mentor.getMentorByUserId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontro mentor para el proyecto con id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar mentor para el proyecto con id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};
