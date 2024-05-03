const Router = require("express").Router;
const router = Router();
const usuarioControlador = require("./controller/usuarioController");
const auth = require("./middleware/auth")

router.post("/usuario", usuarioControlador.createUsuario);
router.get("/usuario/all", usuarioControlador.readUsuario);
//router.get("/usuario/:id", usuarioControlador.readUsuarioPorId);
//router.patch("/usuario/:id", usuarioControlador.updateUsuario);
//router.delete("/usuario/:id", usuarioControlador.deleteUsuario);


//ROTAS QUE PRECISAM DE AUTENTICAÇÃO
router.get("/usuario", auth, usuarioControlador.readUsuarioPorId);
router.patch("/usuario", auth, usuarioControlador.updateUsuario);
router.delete("/usuario", auth, usuarioControlador.deleteUsuario);

router.post("/usuario/login", usuarioControlador.login);



router.get("/", (req, res)=>{
    res.send("Hello World!");
    console.log("Rota definida");
});

module.exports = router;