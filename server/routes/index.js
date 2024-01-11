require('dotenv').config();
const express = require('express');
const router = express.Router();
const transporter = require('../Controllers/Mailer')




const PaymentController = require('../Controllers/PaymentsController')
const PaymentService = require ('../Services/PaymentsService')
const PaymentInatance = new PaymentController(new PaymentService())

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/mail', async function (req, res) {
  const { nombre, email, asunto, mensaje } = req.body;
  try {
    const response = await transporter.sendMail({
    from: `"PORTFOLIO" <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    subject: asunto,
    text: `Correo de ${nombre}, ${email}: ${mensaje}`,
  });

  res.status(200).json({ ok: true, message: 'mensaje enviado con éxito', response: response});
  } catch (error) {
    res.status(404).json(error.message)
  }
});



router.post('/payment', function(req, res, next) {
  PaymentInatance.getPaymentLink(req, res);
});
module.exports = router;
