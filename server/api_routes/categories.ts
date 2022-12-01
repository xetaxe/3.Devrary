import express from 'express'
import { Router } from 'express'
import { Category } from '../models/category'

const router = express.Router()

router.get('/getAllCategories', async (req, res) => {
	try {
		const categories = await Category.find({});
		console.log(categories);
		res.status(200).send({'categories': categories});
	} catch {
		res.redirect('/');
	}
	
})

router.get('/getCategories', async (req, res) => {
	let searchCategories : {name?: any} = {}
	console.log(req.query.name)
	if (req.query.name != null && req.query.name != undefined && req.query.name !== '') {
		searchCategories.name = new RegExp(req.query.name?.toString(), 'i')
		// searchCategories.name = req.query.name;
	}
	try {
		const categories = await Category.find(searchCategories);
		console.log(categories);
		const sendCategories : string[] = await categories.map(cat => cat.name)
		res.status(200).send(JSON.stringify({'categories': sendCategories}));
	} catch {
		res.redirect('/');
	}
	
})

router.get('/:cat', (req, res) => {
	res.status(200).send(`Everything went fine ${req.params.cat}`)
})


router.post('/', async (req, res) => {
	console.log("My body:\n")
	console.log(req.body)
	const category = new Category({
		name: req.body.name
	})
	try {
		const newCategory = await category.save()
		res.status(200).send({'message': "New category created"})

		// res.status(409).send({'message': "Category already exists"})
	} catch {
		res.send({'message': "An error occurred trying to add category"})
	}
	
})


export {router}