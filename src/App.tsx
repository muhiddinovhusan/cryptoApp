import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SinglePage from "./pages/SinglePage"
import { CryptoProvider } from "./crypto-managment/Context"
import Header from "./components/Header"
import './App.css'
import WatchList from "./components/WatchList"
const App = () => {
  return (
    
      <BrowserRouter>
      
        <CryptoProvider>
      <Header/>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<h1 >404</h1>}/>
        <Route path="/single/:id" element={<SinglePage/>}/>
      </Routes>
      <WatchList/>
        </CryptoProvider>
      </BrowserRouter>
  )
}

export default App