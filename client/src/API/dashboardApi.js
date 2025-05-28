import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('nihemart_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// _______________________ Categories and sub categories  ___________________________

export const createDeposit= (formData) => API.post('/deposit', formData,{
    headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const fetchDeposits= (startDate,endDate) => API.get(`/deposit?startDate=${startDate}&endDate=${endDate}`);
// export const getDeposit= () => API.get('/categories');
export const updateDeposit= (formData) => API.put(`/deposit/${formData.id}/update`, formData);
export const deleteDeposit= (id) => API.delete(`/deposit/${id}/delete`);
export const getDeposit= (id) => API.get(`/categories/${id}/details`);
export const getSkippedDays= (year,month) => API.get(`/deposit/calendar-skipped/${year}/${month}`);


export const fetchUsers= () => API.get('/users');
export const getPendingDeposits= (startDate,endDate)=> API.get(`/deposit/requests?start=${startDate}&end=${endDate}`)
export const approveDeposit= (data)=> API.put(`/deposit/${data._id}/approve`)

export const getAllUserBalances = ()=> API.get("/withdrawals/all")
export const withdrawal = (FormData)=> API.post("/withdrawals/", FormData, {
  headers:{
    "Content-Type":"multipart/form-data"
  }
})