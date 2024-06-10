import express from "express";
const router = express.Router();
import { createOrder, mercadopagoWebhook } from '../controllers/mercadopago.controller.js'


router.get('/create-order', createOrder);

router.post('/webhook', mercadopagoWebhook);

router.get('/success', (req, res) => {
    res.send('Success');
});

router.get('/failure', (req, res) => {
    res.send('Failure');
});

router.get('/pending', (req, res) => {
    res.send('Pending');
});


export default router