const axios = require('axios');

const getSomeData = async () => {
  try {
    const response = await axios.get('https://api.somesite.com/data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getSomeData };