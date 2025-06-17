const Equipo = require("../models/equipo_proyecto.model");


// Crear un nuevo proyecto
exports.createEquipo = (req, res) => {
    // Validar que el cuerpo de la petición no esté vacío
    if (!req.body) {
      return res.status(400).send({
        message: "El contenido no puede estar vacío"
      });
    }
  

    // Creamos una nueva instancia de Equipo
    const equipo = new Equipo({
        nombre: req.body.nombre,
        cargo: req.body.cargo,
        descripcion: req.body.descripcion,
        proyecto_id: req.body.proyecto_id
    });
  
    // Guardamos en la base de datos
    Equipo.save(equipo, (err, data) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Ocurrió un error al crear el proyecto"
        });
      }
      res.send(data);
    });
  };

  exports.getEquipo = (req, res) => {

    Equipo.getByIdProyecto(req.params.id, (err, data) => {
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