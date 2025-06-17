module.exports = app => {
  const user = require("../controllers/user.controller.js");
  const post = require("../controllers/post.controller.js");
  const experiencia = require("../controllers/experiencia_user.controller.js");
  const educacion = require("../controllers/educacion_user.controller.js");
  const habilidad = require("../controllers/habilidad.controller.js");
  const proyecto = require("../controllers/proyectos.controller.js");
  const equipo = require("../controllers/equipo_proyecto.controller.js");
  const problema = require("../controllers/problema.controller.js");
  const solucion = require("../controllers/solucion.controller.js");
  const roadmap = require("../controllers/roadmap.controller.js");
  const inversion = require("../controllers/inversion.controller.js");
  const actualizacion = require("../controllers/actualizaciones.controller.js");
  const follow = require("../controllers/follow.controller.js");
  const mentor = require("../controllers/mentor.controller.js");
  const messages = require("../controllers/message.controller.js");
  const chatgpt = require ("../controllers/chatgpt.controller.js");
  const AuthJwt = require("../middleware/authJwt.js");

  var router = require("express").Router();

  //User Routes ----------------------------------

  // Create a new User
  router.post("/user/register", user.create);

  // Handle login
  router.post("/user/login", user.login);

  // Retrieve all Users
  router.get("/user", AuthJwt.verifyEmprendedorOrInversor, user.findAll);

  // Retrieve all Mentores
  router.get("/mentores",AuthJwt.verifyEmprendedorOrInversor, user.findAllMentores);

  // Retrieve a single User with id
  router.get("/user/:id", AuthJwt.verifyEmprendedorOrInversor,user.findOne);

  //Update de usuario
  router.put("/user/:id", AuthJwt.verifyEmprendedorOrInversor, user.update);
  //update Acerca De
  router.put("/user/acerca_de/:id", AuthJwt.verifyEmprendedorOrInversor, user.updateAcercaDe);
  //update isMentor
  router.put("/user/isMentor/:id", AuthJwt.verifyEmprendedorOrInversor, user.updateisMentor);

//Posts Routes ----------------------------------------------

  // Create post
  router.post("/post", AuthJwt.verifyEmprendedorOrInversor, post.createPost);

  //Get MyPosts
  router.get("/myPosts", AuthJwt.verifyEmprendedorOrInversor, post.getAllMyPosts);

  //Experiencia Routes ----------------------------

 // Create experiencia
  router.post("/experience", AuthJwt.verifyEmprendedorOrInversor, experiencia.createExperiencia);
 // Find experiencia by UsuarioId
  router.get("/experience/:id", AuthJwt.verifyEmprendedorOrInversor, experiencia.findById);
 // Find experiencia by Id
  router.get("/experiencia/edit/:id", AuthJwt.verifyEmprendedorOrInversor, experiencia.findExperienciaById);
  //Update de experiencia
  router.put("/experience/:id", AuthJwt.verifyEmprendedorOrInversor, experiencia.update);
  //Delete experiencia
  router.delete("/experiencia/delete/:id", AuthJwt.verifyEmprendedorOrInversor, experiencia.deleteById);

  //Educacion Routes ----------------------------

   // Create Educacion
   router.post("/educacion", AuthJwt.verifyEmprendedorOrInversor, educacion.createEducacion);
   // Find Educacion by UsuarioId
    router.get("/educacion/:id", AuthJwt.verifyEmprendedorOrInversor, educacion.findById);
   // Find Educacion by Id
    router.get("/educacion/edit/:id", AuthJwt.verifyEmprendedorOrInversor, educacion.findEducacionById);
    //Update de Educacion
    router.put("/educacion/:id", AuthJwt.verifyEmprendedorOrInversor, educacion.update);
    //Delete Educacion
    router.delete("/educacion/delete/:id", AuthJwt.verifyEmprendedorOrInversor, educacion.deleteById);


    //Habilidad Routes -------------------------------------------

    // Create Educacion
    router.post("/habilidad", AuthJwt.verifyEmprendedorOrInversor, habilidad.createHabilidad);
    // Find Educacion by UsuarioId
    router.get("/habilidad/:id", AuthJwt.verifyEmprendedorOrInversor, habilidad.findById);
    //Delete Habilidad
    router.delete("/habilidad/delete/:id", AuthJwt.verifyEmprendedorOrInversor, habilidad.deleteById);
    // Find Educacion by Id
    router.get("/habilidad/edit/:id", AuthJwt.verifyEmprendedorOrInversor, habilidad.findHabilidadById);


    //Proyecto Routes -------------------------------------------
    // Create Proyecto
    router.post("/proyecto", AuthJwt.verifyEmprendedorOrInversor, proyecto.createProyecto);
    // Find Proyecto by UsuarioId
    router.get("/proyecto/:id", AuthJwt.verifyEmprendedorOrInversor, proyecto.getAllMyProjects);
    // All Proyectos
    router.get("/proyecto", AuthJwt.verifyEmprendedorOrInversor, proyecto.getAllProjects);
    // All Proyectos Destacados
    router.get("/proyectodestacado", AuthJwt.verifyEmprendedorOrInversor, proyecto.getAllProjectsDestacados);
    // Get Proyecto By Id
    router.get("/proyectofind/:id", AuthJwt.verifyEmprendedorOrInversor, proyecto.getProjectById);
    //Inversion a proyecto
    app.put("/proyectoinvertir/:id", AuthJwt.verifyEmprendedorOrInversor, proyecto.updateInversion);

    //Equipo Routes -------------------------------------------
    // Create Equipo
    router.post("/equipo", AuthJwt.verifyEmprendedorOrInversor, equipo.createEquipo);
    // Find Equipo by UsuarioId
    router.get("/equipo/:id", AuthJwt.verifyEmprendedorOrInversor, equipo.getEquipo);

    //Probelma Routes---------------------------------------------
    // Create Problema
    router.post("/problema", AuthJwt.verifyEmprendedorOrInversor, problema.createProblema);
    // Find Problema by UsuarioId
    router.get("/problema/:id", AuthJwt.verifyEmprendedorOrInversor, problema.getAllMyProblemsByProyectoId);    

    //Routes Soluciones---------------------------------------------
    // Create Soluciones
    router.post("/solucion", AuthJwt.verifyEmprendedorOrInversor, solucion.createSolucion);
    // Find Soluciones by UsuarioId
    router.get("/solucion/:id",AuthJwt.verifyEmprendedorOrInversor, solucion.getAllMySolucionesByProyectoId);    

    //Routes Roadmap---------------------------------------------
    // Create Roadmap
    router.post("/roadmap", AuthJwt.verifyEmprendedorOrInversor, roadmap.createRoadmap);
    // Find Roadmap by UsuarioId
    router.get("/roadmap/:id", AuthJwt.verifyEmprendedorOrInversor, roadmap.getAllMyRoadmapByProyectoId);    

    //Routes Inversiones---------------------------------------------
    // Create Inversiones
    router.post("/inversion", AuthJwt.verifyEmprendedorOrInversor, inversion.createInversion);
    // Find Inversiones by UsuarioId and ProyectoId
    router.get("/inversion/:userId/:projectId", AuthJwt.verifyEmprendedorOrInversor, inversion.getAllInversionesByUserIdAndProyectoId);
    //Find Inversiones by UsuarioId    
    router.get("/inversion/:userId", AuthJwt.verifyEmprendedorOrInversor, inversion.getAllInversionesByUserId);    

    //Routes Actualizaciones---------------------------------------------
    // Create Actualizacion
    router.post("/actualizacion", AuthJwt.verifyEmprendedorOrInversor, actualizacion.createActualizacion );
    // Find Roadmap by UsuarioId
    router.get("/actualizaciones/:id", AuthJwt.verifyEmprendedorOrInversor, actualizacion.getAllMyActualizacionesByProyectoId);   
    
    //Routes Follow---------------------------------------------
    // Create Follow
    router.post("/follow", AuthJwt.verifyEmprendedorOrInversor, follow.createFollow );
    // Find Followers
    router.get("/followers/:id", AuthJwt.verifyEmprendedorOrInversor, follow.getAllMyFollowers);   
    // Find Followings
    router.get("/following/:id", AuthJwt.verifyEmprendedorOrInversor, follow.getAllMyFollowings);   
    // Find Followings
    router.delete("/unfollow/:idFollower/:idFollowing", AuthJwt.verifyEmprendedorOrInversor, follow.deleteFollow); 
    
    
    //Mentor Roadmap---------------------------------------------
    // Create Mentor
    router.post("/mentor", AuthJwt.verifyEmprendedorOrInversor, mentor.createMentor);
    // Find Mentor by UsuarioId
    router.get("/mentor/:id", AuthJwt.verifyEmprendedorOrInversor, mentor.getMentorByUserId);  


    // Message Routes ------------------------------
    router.post("/messages", AuthJwt.verifyEmprendedorOrInversor, messages.create);
    router.get("/messages/:userId/:otherId", AuthJwt.verifyEmprendedorOrInversor, messages.getConversation);
    router.get("/contacts/:userId", AuthJwt.verifyEmprendedorOrInversor, messages.getContactsMessages);


    //ChatGPT
    router.post("/api/gpt", AuthJwt.verifyEmprendedorOrInversor, chatgpt.createChatCompletion)





  app.use('/', router);
};
