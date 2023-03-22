import express from 'express'
import dotenv from 'dotenv'
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'
import cors from 'cors'

const app = express()
app.use(cors())
dotenv.config()
const puerto = process.env.PORT
const audience = process.env.AUDIENCE

const checkJwt = auth({
    audience: audience,
    issuerBaseURL: `https://nubecosmica.us.auth0.com/`,
  });

app.listen(puerto, () => {
    console.log(`Servidor ejecutandose en puerto ${puerto}`)
})

app.get("/", (req,res) => {
    res.send("Aplicacion en Node")
})

app.get("/api/test-protegida", checkJwt , (req,res) => {
    res.json({mensaje: "Api Protegida"})
})

app.get("/api/test-liberada", (req,res) => {
    res.json({mensaje: "Api Liberada"})
})