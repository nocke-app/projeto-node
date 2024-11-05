const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { cpf, nome, dataNascimento, endereco, createdBy, password } = req.body;

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação de um novo usuário
    const newUser = await User.create({
      cpf,
      nome,
      dataNascimento,
      endereco,
      createdBy,
      password: hashedPassword // Adiciona a senha hash
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] } // Exclui a senha da resposta
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { nome, dataNascimento, endereco, updatedBy } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
      user.nome = nome || user.nome;
      user.dataNascimento = dataNascimento || user.dataNascimento;
      user.endereco = endereco || user.endereco;
      user.updatedBy = updatedBy;
      user.updatedAt = new Date();

      await user.save();
      res.json({ message: 'User updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { removedBy } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
      user.status = 'Removido';
      user.removedBy = removedBy;
      user.removedAt = new Date();

      await user.save();
      res.json({ message: 'User removed successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing user', error });
  }
};
