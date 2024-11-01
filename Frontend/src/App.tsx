import { useRouteElements } from "./hooks/useRouteElements"
import { ToastContainer } from "react-toastify"
function App() {
  const routeElements = useRouteElements()
  return (
    <div> 
      {routeElements}
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
