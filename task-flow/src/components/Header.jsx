import { useEffect, useState } from 'react';
import DashboardIcon from '../assets/svg/dashboard.svg';
import { Link } from 'react-router';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle Menuu Close on Escape Key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent Body Scroll When Menu is Open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className="bg-white p-4 fixed top-0 w-full z-50">
                <div className='flex items-center justify-between'>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='md:hidden'
                            aria-label='Toggle Mobile Menu'
                        >
                            <DashboardIcon className='w-6 h-6' />
                        </button>
                        <h1 className="text-2xl font-bold">TaskFlow</h1>
                    </div>
                    {/* Profile Login */}
                </div>
            </header>

            {/* Mobile Navigation */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${
                    isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            <nav
                className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className='p-4'>
                    <h2 className='text-xl font-bold mb-4'>TaskFlow</h2>
                    <ul>
                        <li>
                            <Link 
                                href="/"
                                className='block p-2 hover:bg-gray-200 rounded-md'
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/newTask"
                                className='block p-2 hover:bg-gray-200 rounded-md'
                            >
                                New Task
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/dailyReview"
                                className='block p-2 hover:bg-gray-200 rounded-md'
                            >
                                Daily Review
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}