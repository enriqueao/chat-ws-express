var socket = io();

var nombre = "";

if(localStorage.nombreChat){
    nombre = localStorage.nombreChat;
    // alert("Bienvenido ", nombre);
} else {
    nombre = prompt("Cual es tu nombre?");
    localStorage.nombreChat = nombre;
}

if(nombre == ""){
    nombre = "anonimo";
    localStorage.nombreChat = nombre;
}

socket.on("connect", function () {
    console.log("conectado");
});

socket.on("disconnect", function () {
    console.log('Conexión perdida');
});

// socket.emit('usuarioNuevo', {
//     usuario: "Enrique",
//     mensaja: "Hola :)"
// });

socket.emit('usuarioNuevo', {
    usuario: localStorage.nombreChat
}, (res)=>{
    showMensaje("Servidor", res.res)
});

socket.on("enviarMensaje", (msg) => {
    console.log(msg);
});

socket.on("usuarioNuevo", (res) => {
    showMensaje("Servidor", res.res)
});


function showMensaje(user, msg){
    console.log(user);
    console.log(msg);
    document.getElementById("chat").innerHTML += `${user}: ${msg} <br>`;
}

document.getElementById("btnEnviar").addEventListener("click", ()=>{
    var msg = document.getElementById("mensaje").value;
    socket.emit('mensajeNuevo', {
        usuario: localStorage.nombreChat,
        msg
    });
    showMensaje("Tú", msg);
    document.getElementById("mensaje").value = "";
});

socket.on("mensajeNuevo", (res) => {
    showMensaje(res.usuario, res.msg);
});

document.getElementById("mensaje").addEventListener("input", () => {
    socket.emit("escribiendo", {
        usuario: localStorage.nombreChat
    });
});

socket.on("escribiendo", (data) => {
    document.getElementById("escribiendo").innerHTML = `${data.usuario} esta escribiendo...`;
    setTimeout(() => {
        document.getElementById("escribiendo").innerHTML = "";
    }, 2000);
});