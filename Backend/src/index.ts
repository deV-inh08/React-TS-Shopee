import express, {Response, Request } from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/', authRouter)

app.get('/', (req, res) => {
    res.send("Hello express")
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})