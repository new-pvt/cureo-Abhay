import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore, FLUSH } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';
import tabSlice from './tabSlice';
import doctorDataSlice from './doctorDataSlice';

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    auth: authSlice,
    tab: tabSlice,
    doctorsData: doctorDataSlice,
}));

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [REHYDRATE, PAUSE, PERSIST, REGISTER, PURGE, FLUSH]
        }
    })
});

const persistor = persistStore(store);

export { store, persistor };