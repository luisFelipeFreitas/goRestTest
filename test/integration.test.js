const axios = require('axios');
const todos = require('../constants');
const should = require('should');


// Uma função simples para facilitar as chamadas de APi
async function fetchData() {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://gorest.co.in/public/v2/todos',
    headers: {}
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

// Utilização do MOCHA para organização de testes
describe('API Tests', () => {
    it('should validate the schema', async () => {
        const response = await fetchData();
        const data = response[0];

        // Verificação de cada atributo do objeto e comparando com o schema esperado
        const validation = Object.keys(todos).every(key => {
            if (typeof data[key] !== 'undefined') {
              return todos[key](data[key]);
            }
            return false;
          });
          validation.should.be.true();
        
    });

    it('should validate completed status', async() => {
        const response = await fetchData();
        const data = response[0];
        data.status.should.equal('completed');
    });

    it('should validate if the status makes sense with due_on', async() => {
      const response = await fetchData();
      const data = response[0];
      const currentDate = new Date();
      const todoDate= new Date(data.due_on);
      if(currentDate > todoDate){
        data.status.should.equal('pending');
      }
      else{
        data.status.should.equal('completed');
      }
  });
  });

