import { BrowserRouter as Router, Routes, Route   } from 'react-router-dom';
import Login from './components/Login';
import NotFound from './components/NotFound';
import AdminDashboard from './components/AdminDashboard';
import { useState } from 'react';
import AddAirsoftItem from './components/AddAirsoftItem';
import EditAirsoftItem from './components/EditAirsoftItem';
import Profile from './components/Profile';
import NavbarLayout from './components/NavbarLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" index element={< Login />} />
          <Route element={<NavbarLayout/>} >
            <Route path='/AdminDashboard' element={<AdminDashboard />} />
            <Route path="/AirsoftItem/new" element={<AddAirsoftItem />} />
            <Route path='/AirsoftItem/edit/:id' element={< EditAirsoftItem />} />
            <Route path='/MyProfile/:id' element={< Profile />} />
          </Route>
          <Route path='*' element={< NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
