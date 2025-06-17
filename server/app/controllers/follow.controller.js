const Follow = require("../models/follow.model");
// Crear un nuevo Roadmap
exports.createFollow = (req, res) => {
  //Validar que el cuerpo de la petición no esté vacío
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
  }

  // Creamos una nueva instancia de Roadmap
  const sol = new Follow({
    follower: req.body.follower,
    following: req.body.following
  });

  // Guardamos en la base de datos
  Follow.save(sol, (err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear follow"
      });
    }
    res.send(data);
  });
};

// Obtener todos los followings
exports.getAllMyFollowings = (req, res) => {
  Follow.getMyFollowings(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron follows para el follower id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar follows para el follower id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};

// Obtener todos los followers
exports.getAllMyFollowers = (req, res) => {
  Follow.getMyFollowers(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se encontraron followers para el following id ${req.params.id}.`
        });
      }
      return res.status(500).send({
        message: `Error al recuperar followers para el following id ${req.params.id}.`
      });
    }
    res.send(data);
  });
};





// Controlador para eliminar un follow (unfollow) usando params
exports.deleteFollow = (req, res) => {
  const { idFollower, idFollowing } = req.params;
  console.log(req.params)
  Follow.unfollow(idFollower, idFollowing, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar follow"
      });
    }

    if (data.message && data.message.includes("No se encontró")) {
      return res.status(404).send({
        message: "No existe una relación follow con esos IDs"
      });
    }

    res.send({
      message: "Unfollow realizado correctamente",
      follower: idFollower,
      following: idFollowing
    });
  });
};

