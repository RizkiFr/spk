import express from "express";
import { calculate, getHistory } from "../controllers/main.js";
import { validator } from '../helper/validator.js';

const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).send('OK')
});
router.post('/calculate',validator, calculate);
router.post('/history', getHistory);

export default router;