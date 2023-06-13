import '@fontsource-variable/montserrat';
import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-mono';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { pdfjs } from 'react-pdf';
import router from './router';
import theme from './theme';
import './i18n';
import './index.css';
import { store } from './store/store';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top' } }}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
);
