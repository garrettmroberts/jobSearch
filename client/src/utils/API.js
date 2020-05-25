import axios from 'axios';

export default {
  getUsers: function() {
    return axios.get('/api/users');
  },

  createUser: function(payload) {
    return axios.post('/api/users', payload);
  },

  login: function(payload) {
    return axios.post('/api/users/login', payload);
  }
};