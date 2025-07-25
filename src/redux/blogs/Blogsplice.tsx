
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BLOG_URL } from '../../constants'



export const fetchProducts = createAsyncThunk('fetchProducts', () => {
    return axios.get(API_BLOG_URL)
        .then(res => (
            res.data
        ))
        .catch(error => {
            throw console.log(error);
        });
});

export const addProduct = createAsyncThunk(
    'addProduct',
    (value: Blog) => {
        return axios.post(API_BLOG_URL, value, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.data)
            .catch(error => {
                throw error;
            });
    }
);

export const deleteProduct = createAsyncThunk('deleteProduct', (id: string) => {
    axios.delete(`${API_BLOG_URL}/${id}`)
        .then(res => (
            console.log('sucsses')
        ))
        .catch(error => {

            throw console.log(error)
        })
    return id;
});

export const updateProduct = createAsyncThunk('updateProduct', ({ id, value }: { id: string; value: Blog }) => {
    return axios.put(`${API_BLOG_URL}/${id}`, value, {
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => (
            res.data
        ))
        .catch(error => {
            throw console.log(error);
        });
});
interface Blog {
    id: string;
    title: string;
    description: string;
    conclusion: string;
    thumbnail: string;
    category: string;
    createdAt: string;
}


interface ProductsState {
    list: Blog[];
    loading: boolean;
    error: string | null;
}


const initialState: ProductsState = {
    list: [],
    loading: false,
    error: null,
};


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                console.log(state.error)
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {

                state.list = state.list.filter(p => p.id !== action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const { id } = action.payload;
                const index = state.list.findIndex((item) => item.id === id)
                state.list[index] = action.payload
            })
    },
});

export default productsSlice.reducer;
