// src/features/products/productsSlice.ts
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { ProductItem } from '../../types/Products';

// ✅ Entity Adapter
const productsAdapter = createEntityAdapter<ProductItem>();

// ✅ Async thunk برای fetch محصولات
export const fetchProducts = createAsyncThunk<ProductItem[]>(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    return await res.json();
  }
);

// ✅ Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    loading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

// ✅ Selectors
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
} = productsAdapter.getSelectors((state: RootState) => state.products);

export default productsSlice.reducer;
