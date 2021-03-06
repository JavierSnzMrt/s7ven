const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const UsuariosController = require('./controllers/usuarios.controller');
const ProyectosController= require('./controllers/proyectos.controller');
const jwtController = require("./controllers/jwt.controller");
const {check} = require('express-validator');
const cors = require('cors');
const server = express();

server.use(helmet());
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
server.use(bodyParser.json());
server.use(cookieParser());
server.use(cors({
    "origin":"http://localhost:4200"
}));

server.use(jwtController.checkToken);

server.get('/inicio', (req,res) => {
    res.send('Hola Mundo')
});

//Usuarios
server.get('/verUsuarios', UsuariosController.listaUsuarios);
server.get('/verUsuarioAr/:user_area', UsuariosController.getSingleUser);
server.get('/verUsuario/:id', UsuariosController.getSingleUserID);
server.post('/nuevoUsuario', [
    check('name').isString().escape().trim(),
    check('email').isString(),
    check('password').isString(),
    check('age').isNumeric(),
    check('city').isString(),
    check('training').isString(),
    check('experience').isString(),
    check('user_area').isString(),
    check('offer').isString(),
    
], UsuariosController.insertSingleUser);
server.post("/login", UsuariosController.login);
server.put('/actualizarUsuario', [
    check('name').isString().escape().trim(),
    check('email').isString(),
    check('password').isString(),
    check('age').isNumeric(),
    check('city').isString(),
    check('training').isString(),
    check('experience').isString(),
    check('user_area').isString(),
    check('offer').isString(),
    check('id').isNumeric()
    
], UsuariosController.updateSingleUser);
server.delete('/borrarUsuario/:id', UsuariosController.deleteUser);

//Proyectos
server.get('/verProyectos', ProyectosController.listaProyectos);
server.get('/verProyectoAr/:area', ProyectosController.getSingleProject);
server.get('/verProyecto/:id', ProyectosController.getSingleProjectID);
server.post('/nuevoProyecto',[
check('project_name').isString().escape().trim(),
check('area').isString(),
check('description').isString(),
check('search').isString(),
check('status').isString(),
check('FK_id_user').isNumeric()
],  ProyectosController.insertSingleProject);
server.put('/actualizarProyecto', [
    check('id').isNumeric,
    check('project_name').isString().escape().trim(),
    check('area').isString(),
    check('description').isString(),
    check('search').isString(),
    check('status').isString(),
    
] , ProyectosController.updateSingleProject);
server.delete('/borrarProyecto/:id', ProyectosController.deleteSingleProject);

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto 3000')
})


/*{
	"id":2,
	"name":"Luis",
	"email": "j123@gmail.com",
	"password": "pelota",
	"age":30,
	"city": "Madrid",
	"training":"Medicina",
	"experience": "Quirón",
	"user_area": "Medicina",
	"offer": "biotecnología"
}*/