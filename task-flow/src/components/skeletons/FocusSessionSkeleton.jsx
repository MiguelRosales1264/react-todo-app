export default function FocusSessionSkeleton() {
    return (
        <div className="max-w-4xl mx-auto p-4 animate-fade-in">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                    {/* Task Title */}
                    <div className="h-8 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
                    {/* Category and Time */}
                    <div className="flex items-center gap-3 mt-2">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
                {/* Complete Button */}
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Description */}
            <div className="mb-8">
                <div className="h-5 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Subtasks Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-28 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Filter Bar */}
                <div className="flex gap-2 mb-4">
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Subtasks List */}
                <div className="space-y-3">
                    {[1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
                        >
                            {/* Checkbox */}
                            <div className="w-5 h-5 mt-1 rounded-full bg-gray-200 animate-pulse" />

                            {/* Content */}
                            <div className="flex-1">
                                <div className="h-5 w-2/3 bg-gray-200 rounded mb-2 animate-pulse" />
                                <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
                            </div>

                            {/* Options Button */}
                            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Stats */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full animate-pulse" />
            </div>
        </div>
    );
}
