import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoCard from '../components/todos/TodoCard';
import Button from '../components/ui/Button';
import glitter from '../assets/svg/glitter.svg';

function isToday(date) {
	if (!date) return false;
	let d = date;
	if (typeof d === 'string' || typeof d === 'number') d = new Date(d);
	else if (d.toDate) d = d.toDate();
	if (isNaN(d.getTime())) return false;
	const today = new Date();
	return (
		d.getDate() === today.getDate() &&
		d.getMonth() === today.getMonth() &&
		d.getFullYear() === today.getFullYear()
	);
}

export default function DailyReview() {
	const { todos, loading } = useTodos();
	const [quote, setQuote] = useState(null);
	const [loadingQuote, setLoadingQuote] = useState(false);

	// Filter today's tasks
	const todaysTasks = todos.filter(todo => isToday(todo.dueDate));
	const completed = todaysTasks.filter(t => t.completed).length;
	const total = todaysTasks.length;
	const progress = total > 0 ? (completed / total) * 100 : 0;

	// Simulate AI quote fetch
	const getInspiration = async () => {
		setLoadingQuote(true);
		setQuote(null);
		// Simulate API call
		setTimeout(() => {
			setQuote("Success is the sum of small efforts, repeated day in and day out. – Robert Collier");
			setLoadingQuote(false);
		}, 1200);
	};

	return (
		<div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col">
			<h1 className="text-3xl font-bold mb-2 text-center">Daily Review</h1>
			<div className="mb-6 text-center text-lg text-gray-600">Today's Progress</div>

					{/* Progress Bar */}
					<div className="w-full bg-gray-200 rounded-full h-4">
						<div
							className="bg-blue-600 h-4 rounded-full transition-all duration-300"
							style={{ width: `${progress}%` }}
						/>
					</div>
							<div className="text-center mt-2 mb-6 text-gray-700 font-medium flex flex-col items-center gap-1">
								<span>
									{completed} of {total} tasks done today
								</span>
								<span className="text-sm text-purple-700 font-semibold">
									{total > 0 ? `${Math.round((completed / total) * 100)}%` : '0%'} complete
								</span>
							</div>

					{/* Daily Inspiration Button */}
					<div className="flex flex-col items-center mb-8">
								<Button
									variant="purple"
									className="w-full max-w-xs flex items-center justify-center gap-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md py-3 text-base font-semibold shadow-md"
									onClick={getInspiration}
									disabled={loadingQuote}
								>
									<img src={glitter} alt="Sparkle" className="w-5 h-5" />
									{loadingQuote ? 'Getting Inspiration...' : 'Get Daily Inspiration'}
								</Button>
						{quote && (
							<div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-yellow-900 text-center max-w-lg">
								<span className="italic">{quote}</span>
							</div>
						)}
					</div>

					<h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
					{loading ? (
						<div>Loading...</div>
					) : total === 0 ? (
						<div className="text-gray-500 italic mb-8">No tasks due today. Enjoy your day!</div>
					) : (
						<div className="space-y-4 mb-8">
							{todaysTasks.map(todo => (
								<TodoCard key={todo.id} todo={todo} onToggleComplete={() => {}} />
							))}
						</div>
					)}
		</div>
	);
}
