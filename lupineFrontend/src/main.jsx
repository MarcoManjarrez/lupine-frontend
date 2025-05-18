import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <App/>
   </StrictMode>,
  {/*<StrictMode>
    <Router>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
    </Router>
  </StrictMode>
  Aun por resolver. Mientras, cambiar manualmente las vistas en App.jsx
  */}
 
)
