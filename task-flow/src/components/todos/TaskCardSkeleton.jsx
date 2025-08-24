export default function TaskCardSkeleton() {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all">
            {/* Top Section: Title, Category, and Actions */}
            <div className="flex items-start justify-between w-full mb-3">
                <div className="flex items-start gap-3 flex-1">
                    {/* Checkbox */}
                    <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />

                    {/* Title and Category */}
                    <div className="flex-1 min-w-0">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Actions Menu */}
                <div className="w-8 h-8 rounded bg-gray-200 animate-pulse" />
            </div>

            {/* Bottom Section: Due Date and Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 pt-3 border-t border-gray-100 gap-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full animate-pulse" />
                    <div className="w-10 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}
