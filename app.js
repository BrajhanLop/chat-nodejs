import express from 'express'
import { Server as SocketIOServer } from 'socket.io'
import { engine } from 'express-handlebars'
import { apiRouter } from './routes/api.routes.js'
import { webRouter } from './routes/web.routes.js'


const app = express()

app.use(express.json())

app.use('/static', express.static('./static'))
app.engine("handlebars", engine());
app.set("views", "./views");

app.use('/api', apiRouter)
app.use('/', webRouter)

const httpServer = app.listen(4000, ()=> {
    console.log('server running');
})

const io = new SocketIOServer(httpServer)

io.on('connection', (clientSocket) => {
  console.log('nuevo cliente conectado', clientSocket.id)
//   clientSocket.on('chat', data=> {
//     console.log(data);
//   })
    // clientSocket.emit('mensajito', {hola: 'mundo'})
})