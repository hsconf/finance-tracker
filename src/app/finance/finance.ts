import {createSlice} from "@reduxjs/toolkit";

export interface FinanceState {
    modal: boolean;
    categoryModal: boolean;
}

const initialState: FinanceState = {
    modal: false,
    categoryModal: false,
}

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
    }
})

export const financeReducer = finance.reducer;
export const {openModal, openCategoryModal} = finance.actions;