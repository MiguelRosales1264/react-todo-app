import TaskCardSkeleton from '../todos/TaskCardSkeleton';

export default function DailyReviewSkeleton() {
    return (
        <div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col animate-fade-in">
            {/* Header */}
            <h1 className="text-3xl font-bold mb-2 text-center">
                Daily Review
            </h1>
            <div className="mb-6 text-center text-lg text-gray-600">
                Today's Progress
            </div>

            {/* Progress Bar Skeleton */}
            <div className="w-full bg-gray-200 rounded-full h-4 animate-pulse" />
            
            {/* Stats Skeleton */}
            <div className="text-center mt-2 mb-6 flex flex-col items-center gap-1">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mt-1" />
            </div>

            {/* Inspiration Button Skeleton */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-full max-w-xs h-12 bg-gray-200 rounded-md animate-pulse" />
            </div>

            {/* Tasks Section */}
            <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
            <div className="space-y-4">
                <TaskCardSkeleton />
                <TaskCardSkeleton />
            </div>
        </div>
    );
}
