import express from 'express';
import { Router } from 'express';

const router = Router();

router.get('/tita', (req, res) => {
	res.send('Hello World!')
})


export {router}