import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
  console.log(process.env)
}

//Local imports
import {router as homeApi} from './routes'


//Initialize app
const app = express()


//Initialize and connect to database
async function connectDB() {
  mongoose.connect(process.env.DATABASE_URL!);
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

connectDB()
.then(() => console.log("Connected to MongoDB+Mongoose"))
.catch(error => console.log(error))


//API routes
app.use('/api', homeApi)

app.use(express.static('../client/dist'));



//Server main endpoints --> used to serve React frontend logic

app.get('/*', (req, res) => {
  res.sendFile('/index.html', {root: '../client/dist'})
})

//A revisar
// app.get('/*', (req, res) => {
//   res.redirect('/'); //OJUUUUUUUUUU
//   res.sendFile('/index.html', {root: '../client/dist'})
// })


//Listen app
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})