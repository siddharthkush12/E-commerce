import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/Store.js'
import { Toaster } from './components/ui/sonner'



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
)
