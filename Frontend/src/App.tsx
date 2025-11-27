import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import MapPage from "./pages/MapPage"
import LevelPage from "./pages/LevelPage"

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/levels" element={<MapPage />} />
          <Route path="/level/:id" element={<LevelPage/>} />
        </Routes>
    </>
  )
}

export default App
