const Inversion = require("../models/inversion.model");

// Crear un nuevo Inversion
exports.createInversion = (req, res) => {
  //Validar que el cuerpo de la petición no esté vacío
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
  }


  // Creamos una nueva instancia de Inversion
  const inversion = new Inversion({
    id_usuario : req.body.idUsuario,
    id_proyecto : req.body.idProyecto
  });
  console.log(req.body);
  console.log(inversion);
  // Guardamos en la base de datos
  Inversion.save(inversion, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la inversion"
      });
    }
    res.send(data);
  });
};

// Obtener si existe al menos una inversión de un usuario en un proyecto
exports.getAllInversionesByUserIdAndProyectoId = (req, res) => {
  const { userId, projectId } = req.params;
  Inversion.getMyInvestmentsByUserIdProyectoId(userId, projectId, (err, exists) => {
    if (err) {
      console.error("Error al verificar inversiones:", err);
      return res.status(500).send({
        message: `Error al recuperar inversión para el usuario con id ${userId} y proyecto con id ${projectId}.`
      });
    }

    // `exists` es un booleano: true si encontró al menos una inversión, false si no
    return res.send(exists);
  });
};

// Obtener todos los proyectos invertidos de un usuario
exports.getAllInversionesByUserId = (req, res) => {

  Inversion.getMyInvestmentsByUserId(req.params.userId, (err, data) => {
 
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron inversion para el usuario con id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar inversion para el usuario con id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};

