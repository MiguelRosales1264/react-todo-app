import { cleanupOldCompletedTasks } from '../firebase/todoService';

// Function to run cleanup
export const runTaskCleanup = async () => {
    try {
        const deletedCount = await cleanupOldCompletedTasks();
        if (deletedCount > 0) {
            console.log(`Cleaned up ${deletedCount} old completed tasks`);
        }
    } catch (error) {
        console.error('Error during task cleanup:', error);
    }
};

// Set up periodic cleanup (run once a day)
export const setupPeriodicCleanup = () => {
    // Run cleanup once when the app starts
    runTaskCleanup();

    // Then run it once every 24 hours
    setInterval(runTaskCleanup, 24 * 60 * 60 * 1000);
};
