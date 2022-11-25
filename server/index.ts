import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

//Local imports
import {router as HomeAPI} from './api_routes'
import {router as CategoriesAPI} from './api_routes/categories'

// console.log(CategoryAPI);


//Initialize app
const app = express();


//Initialize and connect to database
async function connectDB() {
  mongoose.connect(process.env.DATABASE_URL!);
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

connectDB()
.then(() => console.log("Connected to MongoDB+Mongoose"))
.catch(error => console.log(error))


//API routes
app.use('/api/home', HomeAPI)
app.use('/api/categories', CategoriesAPI)

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