const Habilidad = require("../models/habilidad.model");


//Crear una nueva habilidad
exports.createHabilidad = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
          });
    }


    const habilidad  = new Habilidad({
        nombre: req.body.nombre,
        usuario_id: req.body.usuario_id
    });

    Habilidad.create(habilidad, (err, data) => {

        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Habilidad"
            })
        }else{
            res.send(data);
        }
    })

};

// Find a habilidad by user_id
exports.findById = (req, res) => {
    Habilidad.findById(req.params.id, (err, data) => {
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
exports.findHabilidadById = (req, res) => {
    Habilidad.findHabilidadById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Habilidad with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Habilidad with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  // Delete a single Experience by ID
exports.deleteById = (req, res) => {
    Habilidad.deleteById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró habilidad con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al eliminar habilidad con id " + req.params.id
          });
        }
      } else res.send({ message: "Habilidad eliminada exitosamente!" });
    });
  };