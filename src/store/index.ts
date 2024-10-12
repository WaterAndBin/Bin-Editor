import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import CryptoJS from 'crypto-js';

import { loginReducer } from './modules/login';
import { userReducer } from './modules/user';

/**
 * 密钥钥匙
 */
const secretKey: string = 'your-secret-key';

/**
 * 加密
 */
const encrypt = (data: any): any => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

/**
 * 解密
 */
const decrypt = (data: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return data;
  }
};

const persistConfig = {
  key: 'root',
  storage,
  serialize: true,
  transforms: [
    {
      in: (state: any) => {
        return encrypt(state);
      },
      out: (state: string) => {
        return decrypt(state);
      }
    }
  ]
};

const rootReducer = combineReducers({
  login: persistReducer(persistConfig, loginReducer),
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 禁止序列化检查
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
