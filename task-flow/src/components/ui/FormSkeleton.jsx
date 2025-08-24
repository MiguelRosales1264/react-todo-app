import Skeleton from './Skeleton';

export default function FormSkeleton() {
    return (
        <div className="space-y-4 bg-white p-4 rounded shadow animate-fade-in">
            {/* Task Name Field */}
            <div>
                <div className="h-5 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
            </div>

            {/* Category Field */}
            <div>
                <div className="h-5 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
            </div>

            {/* Time Estimate Field */}
            <div>
                <div className="h-5 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse" />
            </div>

            {/* Due Date Field */}
            <div>
                <div className="h-5 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>

            {/* Description Field */}
            <div>
                <div className="h-5 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-24 bg-gray-200 rounded w-full animate-pulse" />
            </div>

            {/* Subtasks Section */}
            <div>
                <div className="h-5 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-10 bg-gray-200 rounded flex-1 animate-pulse" />
                    <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>

            {/* Submit Button */}
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
        </div>
    );
}
