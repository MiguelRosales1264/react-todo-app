import { Routes, Route, Outlet } from 'react-router';
import './App.css';
import Header from './components/Header';

function Layout() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      {/* Main content area */}
      <main className='pt-16 md:pt-0 md:ml-64'>
        <div className='p-4 md:p-6'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div className="text-2xl font-bold">Task Dashboard</div>} />
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* Add more routes as needed */}
      </Route>
    </Routes>
  );
}

export default App;
