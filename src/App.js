import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/UI/Navbar/navbar";

import AppRouter from "./components/AppRouter";
// import './styles/App.css';

function App() {
  return (
<BrowserRouter>
            <Navbar />
            <AppRouter/>
        </BrowserRouter>
  )
}
export default App;