import express, { json } from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'

import swaggerUI from 'swagger-ui-express'
import router from './router';

import db from './config/db';
import swaggerSpec, { swaggerUiOption } from './config/swagger';



//Conectar DB

export async function conectDB() {
    try {
        await db.authenticate()
        db.sync();

        // console.log(colors.bgBlue.bold.white("Conexion exitosa a DB"))
    } catch (error) {
        console.log(error)
        console.log(colors.red('Hubo un error'))
    }
}

conectDB()

const server = express()

//Habilitar CORS
const corsOption: CorsOptions = {
    origin: (origin, cb) => {
        if (origin === process.env.FRONT_URL) {
            cb(null, true)
        } else {
            cb(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOption))

server.use(morgan('dev'))
server.use(json())
server.use('/api/products', router)

//Docs 
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOption))

export default server;