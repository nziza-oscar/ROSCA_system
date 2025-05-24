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

export const addCategory= (formData) => API.post('/categories/add', formData,{
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

// create subcategory
export const AddSubCategory = (formData) => API.post('/categories/sub', formData);

export const fetchCategories= () => API.get('/categories');
// export const getCategory= () => API.get('/categories');
export const updateCategory= (formData) => API.put('/categories', formData);
export const deleteCategory= (formData) => API.post('/auth/login', formData);
export const getCategory= (id) => API.get(`/categories/${id}/details`);
export const getCategoryProduct= (categoryId) => API.get(`/products/${categoryId}/category`);
export const metricsCategory= (formData) => API.post('/auth/login', formData);


// Products 

export const createProduct = (formData) => API.post(`/products/${formData.category}/add`,formData,{
  headers:{
    'Content-Type': 'multipart/form-data'
  }
})

// fetch products
export const fetchProducts= () => API.get('/products');
// fetch similar products
export const fetchSimilarProducts = (categoryId,productId)=>API.get(`/products/smilar/${categoryId}/product/${productId}`)
// delete product
export const deleteProduct = (productId)=> API.delete(`/products/${productId}/delete`)
//

// *************** product reviews ********************

export const createReview = (productId, formData) => API.post(`/products/${productId}/reviews`, formData);
export const updateReview = ( formData) => API.put(`/products/${formData.productId}/reviews/${formData.id}`, formData);
export const fetchReviews = () => API.get("/reviews");
export const deleteReview = (data) => API.delete(`/products/${data.productId}/reviews/${data.reviewId}`);
export const fetchReviewInsights = (productId) => API.get(`/products/${productId}/reviews-insights`);



// ********************** SHOPPING CART ********************

export const addToCart = (data) => API.post('/cart/add', data);
export const fetchMyCart = () => API.get('/cart/list');
export const updateCartItem = (itemId, data) => API.put(`/cart/update/${itemId}`, data);
export const deleteCartItem = (itemId) => API.delete(`/cart/${itemId}/remove`);
export const clearCart = () => API.delete('/cart/clear');

// **************** payment methods *********

export const createPaymentMethod = (formData)=> API.post("/payment_method", formData)
export const fetchPaymentMethods = ()=> API.get("/payment_method")
export const updatePaymentMethod = (formData)=> API.put("/payment_method", formData)
export const deletePaymentMethod = (id)=> API.delete(`/payment_method/${id}/delete`)


// *************ORDERS***************

export const getOrders = ()=> API.get("/orders")






