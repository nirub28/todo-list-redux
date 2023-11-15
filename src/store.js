//store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'; // to store data in persistant mode
import storage from 'redux-persist/lib/storage';
import todoReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
