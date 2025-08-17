import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import dashboardIcon from '../assets/svg/dashboard.svg';
import Button from './ui/Button';

export default function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle Menu Close on Escape Key
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
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Mobile Header - Only visible on mobile */}
            <header className="bg-white p-3 fixed top-0 w-full z-20 border-b border-gray-200 md:hidden">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold">
                        <h1 className="text-xl font-bold">TaskFlow</h1>
                    </Link>
                    <Button
                        onClick={() =>
                            setIsMobileMenuOpen(!isMobileMenuOpen)
                        }
                        variant='icon'
                        ariaLabel="Toggle Mobile Menu"
                        size='small'
                    >
                        <img
                            src={dashboardIcon}
                            alt="Menu"
                            className="w-6 h-6"
                        />
                    </Button>
                </div>
            </header>

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${
                    isMobileMenuOpen
                        ? 'opacity-50 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar Navigation - Mobile slide-out & Desktop permanent */}
            <nav
                className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 
                    transform transition-transform duration-300 ease-in-out
                    w-64 md:translate-x-0
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo & App Name */}
                    <div className="flex items-center p-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold">TaskFlow</h2>
                    </div>

                    {/* Dashboard Items */}
                    <div className="flex flex-col h-full gap-2 p-4">
                        {/* Navigation */}
                        <div className="flex flex-col font-bold p-2">
                            <h4 className="uppercase text-xs text-gray-400 px-3 py-2">
                                Navigation
                            </h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>
                                    <Link
                                        to="/"
                                        className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 rounded-md text-gray-700"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <img
                                            src={dashboardIcon}
                                            alt=""
                                            className="w-5 h-5"
                                        />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/new-task"
                                        className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 rounded-md text-gray-700"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <img
                                            src={dashboardIcon}
                                            alt=""
                                            className="w-5 h-5"
                                        />
                                        New Task
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/daily-review"
                                        className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 rounded-md text-gray-700"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <img
                                            src={dashboardIcon}
                                            alt=""
                                            className="w-5 h-5"
                                        />
                                        Daily Review
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/analytics"
                                        className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 rounded-md text-gray-700"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <img
                                            src={dashboardIcon}
                                            alt=""
                                            className="w-5 h-5"
                                        />
                                        Analytics
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-col font-bold p-2">
                            <div>
                                <h4 className="uppercase text-xs text-gray-400 px-3 py-2">
                                    Quick Stats
                                </h4>
                            </div>
                            <div>
                                <ul className="text-sm text-gray-600">
                                    <li>
                                        <p className="flex justify-between py-3 px-4 hover:bg-gray-200 rounded-md">
                                            <div>Todays Tasks</div>{' '}
                                            <span className="font-bold text-green-600">
                                                5
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="flex justify-between py-3 px-4 hover:bg-gray-200 rounded-md">
                                            <div>Completed</div>{' '}
                                            <span className="font-bold text-red-600">
                                                3
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-blue-500 h-2.5 rounded-full"
                                            style={{ width: '60%' }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        60% of tasks completed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
