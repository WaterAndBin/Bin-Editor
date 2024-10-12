import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

// 新创建的 `pages/_app.js` 文件中必须有此默认的导出（export）函数
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
