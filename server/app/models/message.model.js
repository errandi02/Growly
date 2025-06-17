const db = require("./db.js");

// Constructor
const Message = function(message) {
  this.id = message.id;
  this.sender_id = message.sender_id;
  this.receiver_id = message.receiver_id;
  this.content = message.content;
};

// Crear un mensaje
Message.create = (newMessage, result) => {
  const query = "INSERT INTO messages SET ?";
  db.query(query, newMessage, (err, res) => {
    if (err) {
      console.error("Error inserting message:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newMessage });
  });
};

// Obtener conversación entre dos usuarios
Message.getConversation = (userId, otherId, result) => {
  const query = `
    SELECT * FROM messages
    WHERE (sender_id = ? AND receiver_id = ?)
       OR (sender_id = ? AND receiver_id = ?)
    ORDER BY created_at ASC
  `;
  db.query(query, [userId, otherId, otherId, userId], (err, res) => {
    if (err) {
      console.error("Error fetching conversation:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
// Obtener lista de contactos (otros usuarios) con los que userId ha intercambiado mensajes
Message.getContacts = (userId, result) => {
  const query = `
    SELECT DISTINCT
      CASE
        WHEN sender_id = ? THEN receiver_id
        ELSE sender_id
      END AS contact_id
    FROM messages
    WHERE sender_id = ? OR receiver_id = ?
  `;
  db.query(query, [userId, userId, userId], (err, res) => {
    if (err) {
      console.error("Error fetching contacts:", err);
      result(err, null);
      return;
    }
    // Devolver sólo un array de IDs
    const ids = res.map(row => row.contact_id);
    result(null, ids);
  });
};

module.exports = Message;