const mensajesContainer = document.getElementById("mensajes");
const name1 = document.getElementById("name");
const msg = document.getElementById("msg");
const but = document.getElementById("buton");

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
    await axios.post("http://localhost:4000/api/create",{
        autor:name1.value,  mensaje:msg.value   
    })
    name1.value = ""
    msg.value = ""
    
    renderizarPage()
}

but.addEventListener('click', () => {
    sendMsg()
    // serverSocket.emit('chats', 'holaaaaaa')
})

renderizarPage();
