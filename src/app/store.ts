import {configureStore} from "@reduxjs/toolkit";
import {finance} from "./finance/finance";

export const store = configureStore({
    reducer: {
        finance: finance.reducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;