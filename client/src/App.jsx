import './App.css'

import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/home/home';
import Landing from './views/landingPage/landing';
import Detail from './views/detail/detail';
import Form from './views/form/form';


const App = () => {
  const path = useLocation().pathname

  return (
    <div>
      {path !== '/' && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} />
      </Routes>

    </div>
  )
}

export default App;
