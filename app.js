import express from 'express'
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

app.listen(4000, ()=> {
    console.log('server running');
})