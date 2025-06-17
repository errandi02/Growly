const db = require("./db.js");
const salt = 10;
const jwt = require('jsonwebtoken')

//Constructor
const Post = function(post) {
  this.autor = post.autor;
  this.contenido = post.contenido;
  this.fecha_publicacion = post.fecha_publicacion || new Date();  // Usa la fecha actual por defecto
  this.imagen = post.imagen || null;
  this.likes = post.likes || 0;
  this.comentarios = post.comentarios || 0;
  this.compartidos = post.compartidos || 0;
  this.etiquetas = post.etiquetas || null;
  this.url = post.url || null;
  this.visibilidad = post.visibilidad || 'público';
  this.hashtags = post.hashtags || null;
  this.localizacion = post.localizacion || null;
  this.archivo_adjunto = post.archivo_adjunto || null;
  this.estado = post.estado || 'activo';
};

// Método para insertar el post en la base de datos
Post.save = (newPost, result) => {
  const query = `
      INSERT INTO Post (autor, contenido, fecha_publicacion, imagen, likes, comentarios, compartidos, 
                        etiquetas, url, visibilidad, hashtags, localizacion, archivo_adjunto, estado)
      VALUES (?)
  `;
  const values = [
    newPost.autor,
    newPost.contenido,
    newPost.fecha_publicacion,
    newPost.imagen,
    newPost.likes,
    newPost.comentarios,
    newPost.compartidos,
    newPost.etiquetas,
    newPost.url,
    newPost.visibilidad,
    newPost.hashtags,
    newPost.localizacion,
    newPost.archivo_adjunto,
    newPost.estado
  ];
  db.query(query, [values], (err,res)=>{
    if (err) {
      console.log("Error while inserting user:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newPost }); 
    //console.log(newPost);
  })

};


Post.getMyPosts = (id, result) => {

  db.query(`SELECT * FROM post WHERE autor = ${id}`, (err, res) => {
    if(err){
      console.log("error", err);
      result(err, null);
      return;
    }
    if(res.length){
      console.log("found posts", res);
      result(null, res);
      return;
    }
    // not found Post with the id
    result({ kind: "not_found" }, null);
  })
}

module.exports = Post;
