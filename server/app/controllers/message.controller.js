const Message = require("../models/message.model.js");

// Crear un nuevo mensaje
exports.create = (req, res) => {
  if (!req.body || !req.body.sender_id || !req.body.receiver_id || !req.body.content) {
    return res.status(400).send({ message: "sender_id, receiver_id y content son requeridos." });
  }

  const newMsg = new Message({
    sender_id: req.body.sender_id,
    receiver_id: req.body.receiver_id,
    content: req.body.content
  });

  Message.create(newMsg, (err, data) => {
    if (err) {
      return res.status(500).send({ message: err.message || "Error al crear el mensaje." });
    }
    res.send(data);
  });
};

// Obtener conversación entre dos usuarios
exports.getConversation = (req, res) => {
  const { userId, otherId } = req.params;

  Message.getConversation(userId, otherId, (err, data) => {
    if (err) {
      return res.status(500).send({ message: err.message || "Error al obtener la conversación." });
    }
    res.send(data);
  });
};

// Obtener lista de contactos de un usuario
exports.getContactsMessages = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({ message: "userId es requerido." });
  }

  Message.getContacts(userId, (err, data) => {
    if (err) {
      return res.status(500).send({ message: err.message || "Error al obtener los contactos." });
    }
    res.send(data);
  });
};


