import { Routes, Route, Outlet } from 'react-router';
import './App.css';
import Sidebar from './components/Sidebar';
import FirebaseTest from './components/FirebaseTest';
import TaskDashboard from './pages/TaskDashboard';
import NewTask from './pages/NewTask';
import FocusSession from './pages/FocusSession';

function Layout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            {/* Main content area */}
            <main className="pt-16 md:pt-0 md:ml-64">
                <div className="p-4 md:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<TaskDashboard />} />
                <Route path="/new-task" element={<NewTask />} />
                <Route
                    path="/daily-review"
                    element={
                        <div className="text-2xl font-bold">Daily Review</div>
                    }
                />
                <Route
                    path="/analytics"
                    element={
                        <div className="text-2xl font-bold">
                            Analytics Dashboard
                        </div>
                    }
                />
                <Route path="/focus-session" element={<FocusSession />} />
                <Route path="/firebase-test" element={<FirebaseTest />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                {/* Add more routes as needed */}
            </Route>
        </Routes>
    );
}

export default App;
