import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.response.use(
  function (response) {
    // Qualquer código de status que esteja dentro de 2xx fará com que essa função seja acionada
    // Faça algo com os dados de resposta
    return response;
  },
  function (error) {
    // Quaisquer códigos de status que estejam fora de 2xx fazem com que esta função seja acionada
    // Faça algo com erro de resposta
    if (error.response.status === 401) {
      localStorage.setItem('auth', JSON.stringify({}));
      const currentLocation = window.location;
      window.location.href = `${currentLocation.protocol}//${currentLocation.host}/login`;
    }
    return Promise.reject(error);
  }
);

export default api;
