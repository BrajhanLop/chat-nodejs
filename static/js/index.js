const serverSocket = io("http://localhost:4000/");
const mensajesContainer = document.getElementById("mensajes");
const name1 = document.getElementById("name");
const msg = document.getElementById("msg");
const but = document.getElementById("buton");

Swal.fire({
  title: "Identificate",
  input: "text",
  inputValidator: (value) => {
    return !value && "¡Necesitas escribir un nombre para chatear!";
  },
  allowOutsideClick: false,
}).then((res) => {
  name1.value = res.value;
  // avisa que se logeo un usuario
  serverSocket.emit("nuevousuario", name1.value);
});

serverSocket.on("actualizarmsg", (data) => {
  console.log(data);
  renderizarPage();
});

const obtenerMensajes = async () => {
  const data = await axios.get("http://localhost:4000/api/");
  const mensajes = data.data.data.mensajes;
  return mensajes;
};

const renderizarPage = async () => {
  const mensajesRecibidos = await obtenerMensajes();
  // console.log(mensajesRecibidos);
  mensajesContainer.innerHTML = "";
  mensajesRecibidos.map((ms) => {
    let msg = `  <p class="mt-3"> <b> ${ms.autor} dice: </b> ${ms.mensaje} </p>`;
    mensajesContainer.innerHTML += msg;
  });
};

const sendMsg = async () => {
  await axios.post("http://localhost:4000/api/create", {
    autor: name1.value,
    mensaje: msg.value,
  });
  name1.value = "";
  msg.value = "";

  renderizarPage();
};

but.addEventListener("click", () => {
  sendMsg();
  serverSocket.emit("chat", "user envio mensaje");
});

renderizarPage();

serverSocket.on("nuevousuario", (nomuser) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    title: `${nomuser} se ha unido al chat`,
    icon: "success",
  });
});
