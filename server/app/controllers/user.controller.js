
const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    id: req.body.id,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    birth_date: req.body.birth_date,
    role_id: req.body.role_id,
    titulo_profesional: req.body.titulo_profesional,
    password: req.body.password
    
  });

  // Save Tutorial in the database
  User.create(user, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    }else{
      res.send(data);
    } 
  });
};

// Update an existing User
exports.update = (req, res) => {
  // Validar que se haya proporcionado un ID
  if (!req.body.id) {
    return res.status(400).send({
      message: "User ID is required to update the user!"
    });
  }

  // Crear un objeto con los datos a actualizar
  const updatedUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    birth_date: req.body.birth_date,
    //password: req.body.password, // Esta será la nueva contraseña si se proporciona
    titulo_profesional: req.body.titulo_profesional,
    acerca_de: req.body.acerca_de,
    url_imagen_perfil: req.body.url_imagen_perfil,
    url_imagen_cabecera: req.body.url_imagen_cabecera,
    ciudad: req.body.ciudad,
    pais: req.body.pais,
    telefono: req.body.telefono,
    sitio_web: req.body.sitio_web,
    configuracion_privacidad: req.body.configuracion_privacidad,
    contador_conexiones: req.body.contador_conexiones
  });

  // Llamar al método update del modelo
  User.update(req.body.id, updatedUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the User."
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateAcercaDe = (req, res) => {
  // Validar que se haya proporcionado un ID
  if (!req.body.id) {
    return res.status(400).send({
      message: "User ID is required to update the user!"
    });
  }

  // Crear un objeto con los datos a actualizar
  const updatedUser = new User({
    acerca_de: req.body.acerca_de,
    id: req.body.id

  });

  // Llamar al método update del modelo
  User.updateAcercaDe(updatedUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the User."
      });
    } else {
      res.send(data);
    }
  });
};
exports.updateisMentor = (req, res) => {
  // Validar que se haya proporcionado un ID
  if (!req.body.id) {
    return res.status(400).send({
      message: "User ID is required to update the user!"
    });
  }

  // Crear un objeto con los datos a actualizar
  const updatedUser = new User({
    isMentor: req.body.isMentor,
    id: req.body.id
  });

  // Llamar al método update del modelo
  User.updateIsMentor(updatedUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the User."
      });
    } else {
      res.send(data);
    }
  });
};
exports.findAll = (req, res) => {
  User.getAll(req.query.name, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    } else {
      
      res.send(data);
    }
  });
};

exports.login = (req, res) => {
  // 1) Extraemos email y password del body
  const { email, password } = req.body;

  // 2) Validamos que vengan ambos campos
  if (!email || !password) {
    return res.status(400).json({ Error: 'Email y contraseña son obligatorios.' });
  }

  // 3) Construimos un objeto con los datos que espera el modelo
  const credentials = { email, password };

  // 4) Llamamos al método de login del modelo, pasándole las credenciales y el res
  User.login(credentials, res);
};

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
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

exports.findAllMentores = (req, res) => {
  User.getAllMentores(req.query.name, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    } else {
      res.send(data);
    }
  });
};