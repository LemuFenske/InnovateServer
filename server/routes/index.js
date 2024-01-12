require('dotenv').config();
const express = require('express');
const router = express.Router();
const transporter = require('../Controllers/Mailer')




// const PaymentController = require('../Controllers/PaymentsController')
// const PaymentService = require ('../Services/PaymentsService')
// const PaymentInatance = new PaymentController(new PaymentService())


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/send', async function (req, res) {
  const { nombreApellido, empresaRubro, pais, ciudadProvincia, email, celular, mensaje, respuestaSeguridad } = req.body;

  try {
      const messageBody = `
          Nombre y Apellido: ${nombreApellido}
          Empresa/Rubro: ${empresaRubro}
          País: ${pais}
          Ciudad/Provincia: ${ciudadProvincia}
          Email: ${email}
          Celular: ${celular}
          Mensaje: ${mensaje}
          Respuesta de seguridad: ${respuestaSeguridad}
      `;

      const response = await transporter.sendMail({
          from: `"Innovate"`,
          to: 'fenskelemu@gmail.com',
          subject: 'Innovate',
          text: messageBody,
      });

      res.status(200).json({ ok: true, message: 'Mensaje enviado con éxito', response: response });
  } catch (error) {
      res.status(404).json(error.message);
  }
});



// router.post('/payment', function(req, res, next) {
//   PaymentInatance.getPaymentLink(req, res);
// });
module.exports = router;
