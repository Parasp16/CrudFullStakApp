
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import List from './pages/List'
import List_Add from './pages/List_Add'
import List_Update from './pages/List_Update'

function App() {


  return (
  <BrowserRouter>
  <>
    <Routes>
      <Route path='/' element={<List />} />
      <Route path='/add' element={<List_Add />} />
      <Route path='/update/:id' element={<List_Update />} />   {/* FIX */}
    </Routes>
  </>
</BrowserRouter>

  )
}

export default App
