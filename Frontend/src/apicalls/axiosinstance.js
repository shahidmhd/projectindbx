import axios from 'axios'
const bearerToken=localStorage.getItem("token")??""
console.log(bearerToken,"tokenbearer");
const instance = axios.create({
    baseURL: "http://localhost:5000",
    // baseURL:"https://cargo-management.onrender.com"
  });

  // Add an interceptor to the instance
instance.interceptors.request.use(
  config => {
    // Add the Bearer token to the request headers
    config.headers['authorization'] = `Bearer ${localStorage.getItem("token")??""}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

  export default instance