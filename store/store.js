import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage"; // Change this import
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";

const rootReducer = combineReducers({
    authStore: authReducer,
    cartStore: cartReducer,
})

// Create a safe storage that checks for browser environment
const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const safeStorage = typeof window !== 'undefined' ? storage : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage: safeStorage, // Use safe storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store);