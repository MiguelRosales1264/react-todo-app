import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <main className='flex-grow flex items-center justify-center p-4'>
        <h1 className='text-center text-3xl font-bold text-blue-600'>Welcome to TaskFlow</h1>
      </main>

      <Footer />
    </div>
  )
}

export default App
