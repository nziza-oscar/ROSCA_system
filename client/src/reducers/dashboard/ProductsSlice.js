import { createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchProducts, fetchReviewInsights, fetchSimilarProducts, createReview,
    updateReview,
    deleteReview } from "../../actions/dashboard";


const handleSuccess = (state,action) =>{
    state.products = action.payload.data;
    state.loading = false
}

const handleFailure = (state,action) =>{
    state.loading  = false;
    state.error = action.payload.message
}

const handlePending = (state) =>{
    state.loading = true;
    state.error = false
}

const ProductsSlice  = createSlice({
    name:"Products",
    initialState:{
        products:[],
        loading:false,
        error:null,
        success:null,
        similarProducts:[],
        rating:{}
    },
    reducers:{
        clearSuccess: (state) => {
            state.success = null;
          }
    },
    extraReducers:(builder)=>{
                // fetch product
        builder.addCase(fetchProducts.pending,handlePending)
                .addCase(fetchProducts.fulfilled, handleSuccess)
                .addCase(fetchProducts.rejected, handleFailure)
                // create product
                .addCase(createProduct.pending,handlePending)
                .addCase(createProduct.fulfilled, (state,action)=>{
                     state.products.push(action.payload.data)
                     state.loading = false
                     state.success = "Successfully Saved"
                })
                .addCase(createProduct.rejected,handleFailure)
                // fetch similar products
                .addCase(fetchSimilarProducts.pending,handlePending)
                .addCase(fetchSimilarProducts.fulfilled, (state,action)=>{
                     state.similarProducts = action.payload.data
                     state.loading = false

                })
                .addCase(fetchSimilarProducts.rejected,handleFailure)
                // ***********reviews ******************
                .addCase(fetchReviewInsights.pending, handlePending)
                .addCase(fetchReviewInsights.fulfilled, (state,action)=>{
                   state.rating = action.payload.data
                   state.loading = false
                })
                .addCase(createReview.pending, handlePending)
                .addCase(createReview.fulfilled, (state, action) => {
                    state.loading = false;
                    const data = action.payload.data
                    state.products.find((p)=>p._id == data.productId).reviews.push(data.reviews[0])
                    state.success = action.payload.data.message
                    // state.products = state.products.map((product)=>product._id.toString() === data.productId ? ({...product, reviews:}) : )
                })
                .addCase(createReview.rejected, handleFailure)
                .addCase(updateReview.pending, handlePending)
                .addCase(updateReview.fulfilled, (state, action) => {
                    state.loading = false;
                })
                .addCase(updateReview.rejected, handleFailure)
                .addCase(deleteReview.pending, handlePending)
                .addCase(deleteReview.fulfilled, (state, action) => {
                    state.loading = false;

                    // const data = action.payload.data
                    // const p =  state.products.find((p)=>p._id == data.productId).reviews
                    // filter(
                    //     r => r._id.toString() !== data.reviewId.toString()
                    //   );
                    // console.log(p)
                    window.location.reload()
                       //push(data.reviews[0])
                    // product.reviews
                })
                .addCase(deleteReview.rejected, handleFailure);
              
    }

})

export const {clearSuccess} = ProductsSlice.actions

export default ProductsSlice;
