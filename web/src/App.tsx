import { RouterProvider } from 'react-router'
import './App.css'
import ErrorBoundary from './components/result/boundary'
import router from './routes'

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
