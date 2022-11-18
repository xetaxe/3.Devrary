import express from 'express'
import React from 'react'
const app = express()
const PORT = 3000;

import homeController from './src/home/homeController';

// app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.set('view engine', 'html');

app.use('/test', express.static('public'));
app.set

app.use('/', homeController);


// app.get('/', (req:any, res:any) => {
//   res.send('Hello World!')
// })

app.listen(process.env.PORT || PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}/`)
})