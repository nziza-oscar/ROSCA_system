import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  // baseURL: 'https://ishema-api.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('nihemart_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchMyData = () => API.get('/auth/my-data');
export const SignIn = (formData) => API.post('/auth/login', formData);
export const SignUp = (formData) => API.post('/auth/register', formData);




// ___________________________________users__________________________________


export const createUser = (formData)=>API.post("/auth/newuser",formData)
export const updateUser = (formData)=>API.put(`/auth/add-users/${formData._id}`,formData)
export const fetchUsers = ()=>API.get("/auth/users")
export const deleteUser = (userId)=>API.delete("/auth/add-users")


// ******************* USER INFO ***********
export const updateUserInfo = (info)=>API.put('/users/update', info)
export const addUserAddress = (info)=> API.post("/users/address", info)
export const updateUserAddress = (info)=> API.put(`/users/address/${info.id}/update`, info)
export const removeAddress = (id)=> API.delete(`/users/address/${id}/remove`)



// dangerzone

export const updateUserPassword = (info)=>API.put('/users/password', info)


