import express from 'express'
import { config } from './config'
import { routes } from './routes'
import 'reflect-metadata'

const app = express()

app.use(express.json())
app.use(routes)
app.listen(config.PORT, () => {console.log(`app listen ${config.PORT}`)})
