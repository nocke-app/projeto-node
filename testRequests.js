const axios = require('axios');

const API_URL = 'http://localhost:3000/api/users';

async function registerUser() {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        cpf: '134265776541', // Novo CPF para evitar duplicidade
        nome: 'Paulo Souza Almeida',
        dataNascimento: '1993-04-10',
        endereco: {
          rua: 'Avenida Teste Nova',
          numero: '10',
          complemento: 'Sala 1',
          bairro: 'Bairro Central',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          cep: '22000-000'
        },
        password: 'senhaForte123', // Senha definida
        createdBy: 'admin_teste'
      });
      console.log('Register User Response:', response.data);
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
    }
  }

async function loginUser() {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      cpf: '134265776541',
      password: 'senhaForte123' // Mesma senha usada no registro
    });
    console.log('Login User Response:', response.data);
    return response.data.token; // Retorna o token JWT para uso posterior
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
  }
}

async function getUserById(id, token) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Get User Response:', response.data);
  } catch (error) {
    console.error('Error fetching user:', error.response ? error.response.data : error.message);
  }
}

async function updateUser(id, token) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      nome: 'Paulo Souza Almeida',
      dataNascimento: '1993-04-15',
      endereco: {
        rua: 'Rua Atualizada',
        numero: '55',
        complemento: 'Sala 2',
        bairro: 'Bairro Atualizado',
        cidade: 'Niterói',
        estado: 'RJ',
        cep: '24000-000'
      },
      updatedBy: 'editor_teste'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Update User Response:', response.data);
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
  }
}

async function deleteUser(id, token) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        removedBy: 'admin_teste'
      }
    });
    console.log('Delete User Response:', response.data);
  } catch (error) {
    console.error('Error deleting user:', error.response ? error.response.data : error.message);
  }
}

// Executar as funções de teste em sequência
(async () => {
  await registerUser(); // Registra um usuário
  const token = await loginUser(); // Faz login e retorna o token
  if (token) {
    await getUserById(1, token); // Substitua "1" pelo ID do usuário que deseja buscar
    await updateUser(1, token); // Substitua "1" pelo ID do usuário que deseja atualizar
    await deleteUser(1, token); // Substitua "1" pelo ID do usuário que deseja deletar
  }
})();
