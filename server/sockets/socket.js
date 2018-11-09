
const { io } = require('../server');


io.on("connection", (client) => {
    console.log("Usuario Conectado");

    client.emit("enviarMensaje", {
        usuario: "Admin",
        mensaje: "Bienvenido"
    });

    client.on("disconnect", () => {
        console.log("se desconecto :(");
    });

    client.on("enviarMensaje", (message) => {
        console.log(message);
        // callback("todo bien");
        client.broadcast.emit("enviarMensaje", message);
    });

    client.on("usuarioNuevo", (user, callback) => {
        callback({
            res: `Bienvenido ${user.usuario}`
        });
        client.broadcast.emit("usuarioNuevo", {
            res: `${user.usuario} Se ha unido`
        });
    });

    client.on("mensajeNuevo", (req)=>{
        client.broadcast.emit("mensajeNuevo", {
            msg: req.msg,
            usuario: req.usuario,
        });
    });
}); 