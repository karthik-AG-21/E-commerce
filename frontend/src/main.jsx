import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './redux/store.js';

 const client = new QueryClient()



createRoot(document.getElementById('root')).render(


    <QueryClientProvider client={client}>
      <Provider store={store}>
      <App />
      </Provider>
    </QueryClientProvider>
  
)
