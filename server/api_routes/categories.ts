import express from 'express'
import { Router } from 'express'

const router = express.Router()

router.get('/getAllCategories', (req, res) => {
	res.status(200).send("Everything went fine")
})

router.get('/:cat', (req, res) => {
	res.status(200).send(`Everything went fine ${req.params.cat}`)
})


router.post('/', (req, res) => {
	res.status(200).send("New category created")
})


export {router}