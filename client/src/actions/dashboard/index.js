import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../API/dashboardApi"

export const  fetchCategories = createAsyncThunk("Category/fetch",
    async(_,thunkAPI)=>{
        try {
            const {data} = await API.fetchCategories()

            return {status: "SUCCESS", data: data}
            
        } catch (error) {
            return thunkAPI.rejectWithValue({
                status:"ERROR",
                message: error.response?.data?.message || "Fetching categories failed"
            })
        }
    }
)


export const  getCategory = createAsyncThunk("Category/get",
  async(id,thunkAPI)=>{
      try {
          const {data} = await API.getCategory(id)

          return {status: "SUCCESS", data: data}
          
      } catch (error) {
          return thunkAPI.rejectWithValue({
              status:"ERROR",
              message: error.response?.data?.message || "Fetching categories failed"
          })
      }
  }
)




export const  getCategoryProduct = createAsyncThunk("Category/Products",
  async(id,thunkAPI)=>{
      try {
          const {data} = await API.getCategoryProduct(id)

          return {status: "SUCCESS", data: data}
          
      } catch (error) {
          return thunkAPI.rejectWithValue({
              status:"ERROR",
              message: error.response?.data?.message || "Fetching categories failed"
          })
      }
  }
)


export const addCategory = createAsyncThunk("category/add",
  async (category, thunkAPI) => {
    try {
      const {data} = await API.addCategory(category);
      return { status: "SUCCESS", data: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: "ERROR",
        message: error.message || "Adding category failed"
      });
    }
  }
);


export const addSubCategory = createAsyncThunk("subcategory/add",
  async (category, thunkAPI) => {
    try {
      const {data} = await API.AddSubCategory(category);
      return { status: "SUCCESS", data: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: "ERROR",
        error: error.message,
        message: error.response?.data?.message || "Adding Sub-Category failed"
      });
    }
  }
);



export const updateCategory = createAsyncThunk("category/update",
  async (category, thunkAPI) => {
    try {
      const data = await API.updateCategory(category);
      return { status: "SUCCESS", payload: data };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: "ERROR",
        message: error.message || "Updating category failed"
      });
    }
  }
);

export const deleteCategory = createAsyncThunk("category/delete",
  async (id, thunkAPI) => {
    try {
      const deletedId = await API.deleteCategory(id);
      return { status: "SUCCESS", payload: deletedId };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: "ERROR",
        message: error.message || "Deleting category failed"
      });
    }
  }
);




// ______________________ PRODUCTS ______________________________

// create product

export const createProduct = createAsyncThunk("products/create", 
  async (FormData, thunkAPI) =>{
        try {
          const { data } = await API.createProduct(FormData)

          return { status: 'SUCCESS', data:data }
      } catch (error) {
        return thunkAPI.rejectWithValue({
          status: "ERROR",
          message: error.message || "Create Product failed"
        })
      }
  }
)

// fetch products

export const fetchProducts = createAsyncThunk("product/fetch",
  async(_, thunkAPI) =>{
     try {
      const {data} = await API.fetchProducts()
    
      return {status:"SUCCESS", data:data}
     } catch (error) {
        return thunkAPI.rejectWithValue({
          status: "ERROR",
          message: error.message || "Fetch products"
        })
     }
  }
)

// fetch similar products

export const fetchSimilarProducts = createAsyncThunk("productSimilar/Fetch",
   async(params,thunkAPI)=>{
    try {
        const {data} = await API.fetchSimilarProducts(params.categoryId,params.productId)
        return {data, status: "SUCCES"}
    } catch (error) {
       return thunkAPI.rejectWithValue({
        status: "ERROR",
        message: error.message || "failed to fetch products"
       })
    }
   }
)


// delete product

export const deleteProduct = createAsyncThunk("product/delete",
  async(productId, thunkAPI) =>{
     try {

      const { data } = await API.deleteProduct(productId)
      return { status:"SUCCESS", data:data }

     } catch (error) {
        return thunkAPI.rejectWithValue({
          status: "ERROR",
          message: error.message || "Fetch products"
        })
     }
  }
)


// ***********************************product reviews

export const createReview = createAsyncThunk("review/create", async (formData , thunkAPI) => {
  try {
    const { data } = await API.createReview(formData.productId,formData);
    return { status: "SUCCESS", data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: "ERROR",
      message: error.message || "Create review failed",
    });
  }
});


export const updateReview = createAsyncThunk("review/update", async ( formData, thunkAPI) => {
  try {
    const { data } = await API.updateReview(formData);
    return { status: "SUCCESS", data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: "ERROR",
      message: error.message || "Update review failed",
    });
  }
});


export const fetchReviews = createAsyncThunk("review/fetchAll", async (_, thunkAPI) => {
  try {
    const { data } = await API.fetchReviews();
    return { status: "SUCCESS", data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: "ERROR",
      message: error.message || "Fetch reviews failed",
    });
  }
});




export const deleteReview = createAsyncThunk("review/delete", async (info, thunkAPI) => {
  try {
    const { data } = await API.deleteReview(info);
    return { status: "SUCCESS", data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: "ERROR",
      message: error.message || "Delete review failed",
    });
  }
});



export const fetchReviewInsights = createAsyncThunk("review/fetchInsights", async (productId, thunkAPI) => {
  try {
    const { data } = await API.fetchReviewInsights(productId);
    return { status: "SUCCESS", data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: "ERROR",
      message: error.message || "Fetch review insights failed",
    });
  }
});


// ***********************SHOPINGCART**************

export const fetchCartThunk = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    const response = await API.fetchMyCart();
    return { status: 'SUCCESS', data: response.data.cart };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: 'ERROR',
      message: error.message || 'Add to cart failed',
    });
  }
});

export const addToCartThunk = createAsyncThunk('cart/add', async (data, thunkAPI) => {
  try {
    const response = await API.addToCart(data);
    return { status: 'SUCCESS', data: response.data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: 'ERROR',
      message: error.message || 'Add to cart failed',
    });
  }
});

export const updateCartItemThunk = createAsyncThunk('cart/update', async ({ itemId, data }, thunkAPI) => {
  try {
    const response = await API.updateCartItem(itemId, data);
    return { status: 'SUCCESS', data: response.data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: 'ERROR',
      message: error.message || 'Update cart item failed',
    });
  }
});

export const deleteCartItemThunk = createAsyncThunk('cart/delete', async (itemId, thunkAPI) => {
  try {
    const response = await API.deleteCartItem(itemId);
    return { status: 'SUCCESS', data: response.data.cart };
  } catch (error) {

    return thunkAPI.rejectWithValue({
      status: 'ERROR',
      message: error.response?.data?.message || 'Delete cart item failed',
    });
  }
});

export const clearCartThunk = createAsyncThunk('cart/clear', async (_, thunkAPI) => {
  try {
    const response = await API.clearCart();
    return { status: 'SUCCESS', data: response.data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: 'ERROR',
      message: error.message || 'Clear cart failed',
    });
  }
});




// *************************PAYMENT METHODS*****************


export const createPaymentMethod = createAsyncThunk("payment/create", async(formData, thunkAPI)=>{
  try {
     const { data} = await API.createPaymentMethod(formData)
     return {status: "SUCCESS", data}
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: "ERROR",
      message: error.response?.data?.message || "Failed to create payment"
    })
  }
})


export const fetchPaymentMethods = createAsyncThunk("payment/fetch", async (_, thunkAPI) => {
  try {
    const { data } = await API.fetchPaymentMethods("/payment_method");
    return { status: "SUCCESS", data };
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({
      status: "ERROR",
      message: error.response?.data?.message || "Failed to fetch payment methods",
    });
  }
});

export const updatePaymentMethod = createAsyncThunk("payment/update", async (formData, thunkAPI) => {
  try {
    const { data } = await API.updatePaymentMethod("/payment_method", formData);
    return { status: "SUCCESS", data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: "ERROR",
      message: error.response?.data?.message || "Failed to update payment method",
    });
  }
});

export const deletePaymentMethod = createAsyncThunk("payment/delete", async (id, thunkAPI) => {
  try {
    const { data } = await API.deletePaymentMethod(id);
    return { status: "SUCCESS", ...data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: "ERROR",
      message: error.response?.data?.message || "Failed to delete payment method",
    });
  }
});



// **************orders********************


export const getOrders = createAsyncThunk("orders/get", async(_, thunkAPI)=>{
  try {
     const {data} = await API.getOrders()
     return {data}
  } catch (error) {
     return thunkAPI.rejectWithValue({
      status:"ERROR",
      message: error.response?.data?.message
     })
  }
})

