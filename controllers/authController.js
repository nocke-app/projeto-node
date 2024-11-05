const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

exports.login = async (req, res) => {
  const { cpf, password } = req.body;
  try {
    // Verifique se o usuário existe pelo CPF
    const user = await User.findOne({ where: { cpf } });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // Verifique a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
    }

    // Crie um token JWT
    const token = jwt.sign({ id: user.id, cpf: user.cpf }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expira em 1 hora
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error during authentication', error });
  }
};
