
const Post = require("../models/post.model.js");


 // Función para crear un nuevo post
exports.createPost = (req, res) => {

    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const { autor, contenido, imagen, likes, comentarios, compartidos, etiquetas, url, visibilidad, hashtags, localizacion, archivo_adjunto, estado } = req.body;

  // Crear una nueva instancia del modelo Post con los datos recibidos
  const post = new Post({
      autor: req.body.autor,
      contenido: req.body.contenido,
      imagen: req.body.imagen,
      likes: req.body.likes,
      comentarios: req.body.comentarios,
      compartidos: req.body.compartidos,
      etiquetas: req.body.etiquetas,
      url: req.body.url,
      visibilidad: req.body.visibilidad,
      hashtags: req.body.hashtags,
      localizacion: req.body.localizacion,
      archivo_adjunto: req.body.archivo_adjunto,
      estado: req.body.estado
  });

  // Llamar al método save para guardar el post en la base de datos
  Post.save(post, (err, data) => {

    if(err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post"
      })
    }else{
      res.send(data);
    }
  
  })
};

exports.getAllMyPosts = (req, res) =>{
  Post.getMyPosts(req.query.id, (err, data) => {
    const id = req.query.id;            // lee ?id=40
    // Validar que venga un id…
    if (!id) return res.status(400).send('Falta parámetro id');
    else
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with author id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Posts with author id " + req.params.id
          });
        }
      } else res.send(data);
  })
}







