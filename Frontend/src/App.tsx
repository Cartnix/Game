import { Route, Routes } from "react-router-dom"
import LevelPage from "./pages/LevelPage"
import MainPage from "./pages/MainPage"

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/levels" element={<LevelPage />} />
        </Routes>
    </>
  )
}

export default App
