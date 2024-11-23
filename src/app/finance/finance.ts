import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Categories, Category, ICategory} from "../../types";
import {axiosApi} from "../axiosApi";

export interface FinanceState {
    categories: Categories[];
    modal: boolean;
    categoryModal: boolean;
    isLoading: boolean;
    isError: boolean;
}

const initialState: FinanceState = {
    categories: [],
    modal: false,
    categoryModal: false,
    isLoading: false,
    isError: false,
}

export const createCategory = createAsyncThunk<void, Category>('finance/CreateCategory', async (category: Category) => {
    try {
        await axiosApi.post('finance-tracker/categories.json', category);
    } catch (error) {
        console.error(error);
    }
});

export const fetchCategories = createAsyncThunk<Categories[], void>('finance/fetching', async () => {
    try {
        const {data: response} = await axiosApi.get<ICategory | null>('finance-tracker/categories.json');

        if (response === null) {
            return [];
        }

        return  Object.keys(response).map((category) => ({
            ...response[category],
            id: category
        }))

    } catch (error) {
        console.error(error);
        return [];
    }
});

export const finance = createSlice({
    name: "finance",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modal = action.payload;
        },
        openCategoryModal: (state, action) => {
          state.categoryModal = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(createCategory.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
        }).addCase(createCategory.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        }).addCase(fetchCategories.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchCategories.fulfilled, (state, {payload}) => {
            state.categories = payload;
            state.isLoading = false;
            state.isError = false;
            console.log(state.categories);
        }).addCase(fetchCategories.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export const financeReducer = finance.reducer;
export const {openModal, openCategoryModal} = finance.actions;