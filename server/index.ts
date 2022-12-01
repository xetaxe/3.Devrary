import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
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


////////////// MIDDLEWARE

//For testing HTTP req/res cycles
function logger(req: any, res: any, next: any): void {
  console.log(req);
  next();
}
// app.use(logger);


//Standard middleware
const corsOptions = {
  origin: ["http://127.0.0.1:5173/", "http://localhost:3000"],
  methods: "GET,PUT,POST,DELETE",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(express.static('../client/dist'));
app.use(express.json())
app.use(express.urlencoded())


//API routes
app.use('/api/home', HomeAPI);
app.use('/api/categories', CategoriesAPI);






//Server main endpoints --> used to serve React frontend logic

app.get('/*', (req, res) => {
  //   res.redirect('/'); //OJUUUUUUUUUU
  res.sendFile('/index.html', {root: '../client/dist'})
})




//Listen app
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})