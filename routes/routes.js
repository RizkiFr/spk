import express from "express";
import { calculate, getHistory } from "../controllers/main.js";

const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).send('OK')
});
router.post('/calculate', calculate);
router.post('/history', getHistory);

export default router;