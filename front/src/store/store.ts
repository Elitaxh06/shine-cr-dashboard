import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import partnersReduces from "./partnerSlice"

const persistConfig = {
    key: "roor",
    storage,
}

const rootReducer = combineReducers({
    datosPartnerRedux: partnersReduces,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
})

const persistor = persistStore(store)

export { store, persistor}