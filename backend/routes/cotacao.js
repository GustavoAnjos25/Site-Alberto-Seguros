const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { sendCotacao } = require('../controllers/cotacaoController');
const { validate } = require('../middleware/validate');

const commonValidations = [
  body('tipo_seguro')
    .notEmpty().withMessage('Tipo de seguro é obrigatório')
    .isIn(['auto', 'moto', 'residencial', 'vida', 'saude', 'viagem', 'empresarial', 'outro'])
    .withMessage('Tipo de seguro inválido'),
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .trim()
    .isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
  body('cpf')
    .notEmpty().withMessage('CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).withMessage('CPF inválido'),
  body('cep')
    .notEmpty().withMessage('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/).withMessage('CEP inválido'),
  body('whatsapp')
    .notEmpty().withMessage('WhatsApp é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/).withMessage('WhatsApp inválido'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail().withMessage('E-mail inválido'),
];

router.post('/', commonValidations, validate, sendCotacao);

module.exports = router;
