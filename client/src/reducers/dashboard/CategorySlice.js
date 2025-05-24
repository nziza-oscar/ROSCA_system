import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories,addCategory,updateCategory,deleteCategory,getCategory,getCategoryProduct, addSubCategory } from "../../actions/dashboard";
const handleSuccess = (state,action)=>{
     state.loading = false
     state.data = action.payload.data
}
const handleFailure = (state, action) => {
    state.loading = false;
    state.error = action.payload.message;
  };

const handlePending = (state)=>{
  state.loading = true
}

  const categorySlice = createSlice({
    name: "category",
    initialState: {
      categories: [],
      loading: false,
      error: null,
      success: null,
      category:null,
      products:[]
    },
    reducers: {
       clearSuccessError:(state)=>{
        state.success = null;
        state.error = null;
       }
    },
    extraReducers: (builder) => {
      builder
        // Fetch categories
        .addCase(fetchCategories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.categories = action.payload.data; // Add fetched categories to state
        })
        .addCase(fetchCategories.rejected,handleFailure)

        //fetch categories product
        .addCase(getCategoryProduct.fulfilled,(state,action)=>{
           state.products = action.payload.data 
        })
        // Add category
        .addCase(addCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
          state.loading = false;
          state.success = "Successfully Added"
          state.categories.unshift(action.payload.data);
          
        })
        .addCase(addCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        })
        // create subcategory
        .addCase(addSubCategory.pending,handlePending)
        .addCase(addSubCategory.fulfilled, (state,action)=>{
           state.loading = false;
          state.success = "Successfully Added Subcategory"
          state.categories.find((category)=>category._id == action.payload.data.recordedBy)?.subcategories.unshift(action.payload.data);
        })
        .addCase(addSubCategory.rejected, (state,action)=>{
           state.error = action.payload.message;
           state.loading = false
          //  console.log( action.payload.message)
        })
        // getCategory

        .addCase(getCategory.fulfilled, (state, action) => {
           state.category = action.payload.data
        })

        // Update category
        .addCase(updateCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.categories.findIndex(cat => cat.id === action.payload.id);
          if (index !== -1) {
            state.categories[index] = action.payload; // Update category in state
          }
        })
        .addCase(updateCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
        // Delete category
        .addCase(deleteCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.loading = false;
          state.categories = state.categories.filter(cat => cat.id !== action.payload); // Remove category from state
        })
        .addCase(deleteCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    }
  });
  export const {clearSuccessError} = categorySlice.actions
  
  export default categorySlice