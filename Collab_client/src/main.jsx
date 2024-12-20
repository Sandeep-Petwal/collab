import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import store from './state/store'
import { Provider } from 'react-redux'
import { Toaster } from "@/components/ui/toaster"

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </>,
)
