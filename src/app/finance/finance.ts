import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Categories, Category, ICategory, ITransaction, Transaction, Transactions} from "../../types";
import {axiosApi} from "../axiosApi";

export interface FinanceState {
    categories: Categories[];
    transactions: Transactions[];
    modal: boolean;
    categoryModal: boolean;
    isLoading: boolean;
    isError: boolean;
    isDeleting: boolean;
}

const initialState: FinanceState = {
    categories: [],
    transactions: [],
    modal: false,
    categoryModal: false,
    isLoading: false,
    isError: false,
    isDeleting: false,
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

export const createTransaction = createAsyncThunk<void, Transaction>('finance/createTransaction', async (transaction: Transaction) => {
    try {
        await axiosApi.post('finance-tracker/transactions.json', transaction);
    } catch (error) {
        console.error(error);
    }
});

export const fetchTransactions = createAsyncThunk<Transactions[], void>('finance/fetchTransaction', async () => {
   try {
       const {data: response} = await axiosApi.get<ITransaction | null>('finance-tracker/transactions.json');
       if (response === null) {
           return [];
       }

       return Object.keys(response).map((id) => ({
           ...response[id],
           id
       }))
   } catch (e) {
       console.log(e);
       return [];
   }
});

export const deleteTransaction = createAsyncThunk<void, string>('finance/deleteTransaction', async (transactionId) => {
    await axiosApi.delete(`finance-tracker/transactions/${transactionId}.json`);
})

export const finance = createSlice({
    name: "finance",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modal = action.payload;
        },
        openCategoryModal: (state, action) => {
          state.categoryModal = action.payload;
        },
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
        }).addCase(fetchCategories.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        }).addCase(createTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(createTransaction.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
        }).addCase(createTransaction.rejected, (state) => {
            state.isLoading = false;
            state.isError = false;
        }).addCase(fetchTransactions.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchTransactions.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions = payload;
        }).addCase(fetchTransactions.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        }).addCase(deleteTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isDeleting = true;
        }).addCase(deleteTransaction.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isDeleting = false;
        }).addCase(deleteTransaction.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isDeleting = false;
        })
    }
})

export const financeReducer = finance.reducer;
export const {openModal, openCategoryModal} = finance.actions;