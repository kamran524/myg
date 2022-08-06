import React from 'react';
import Simulator from './component/Simulator';
import Club from './component/Club';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
const App = () => {

  return (
    <>
    <Router>
    <Routes>
    <Route path="/" element={<Simulator/>}></Route>
    <Route path="/club" element={<Club/>}></Route>
    </Routes>
    </Router>
    </>
  )
}

export default App