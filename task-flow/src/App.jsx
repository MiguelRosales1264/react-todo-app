import { Routes, Route, Outlet } from 'react-router';
import './App.css';
import Header from './components/Header';

function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* <Header /> */}
      <Outlet />
    </div>
  )
}

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Home Page</div>} />
          {/* <Route path="*" element={<NotFound />} /> */}
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
