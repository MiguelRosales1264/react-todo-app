import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function QuickEditModal({ todo, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: todo.name,
        category: todo.category || '',
        timeEstimate: todo.timeEstimate || '',
        dueDate: todo.dueDate
            ? new Date(todo.dueDate).toISOString().split('T')[0]
            : '',
        status: todo.status || 'pending',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert dueDate back to Date object if it exists
            const processedData = {
                ...formData,
                dueDate: formData.dueDate
                    ? new Date(formData.dueDate + 'T00:00:00')
                    : null,
                timeEstimate: formData.timeEstimate
                    ? parseInt(formData.timeEstimate)
                    : null,
                status: formData.status || 'pending',
            };

            // Remove any empty values
            Object.keys(processedData).forEach((key) => {
                if (
                    processedData[key] === '' ||
                    processedData[key] === undefined
                ) {
                    delete processedData[key];
                }
            });

            console.log('Submitting update:', processedData);
            await onSave(processedData);
            onClose();
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <Modal isOpen onClose={onClose} title="Quick Edit Task">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Task Name
                    </label>
                    <Input
                        type="text"
                        value={formData.name}
                        className="p-2"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <Input
                        type="text"
                        value={formData.category}
                        className="p-2"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                category: e.target.value,
                            }))
                        }
                        placeholder="Enter category"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Estimate (minutes)
                    </label>
                    <Input
                        type="number"
                        value={formData.timeEstimate}
                        className="p-2"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                timeEstimate: e.target.value,
                            }))
                        }
                        min="0"
                        placeholder="Enter time in minutes"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                    </label>
                    <Input
                        type="date"
                        value={formData.dueDate}
                        className="p-2"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                dueDate: e.target.value,
                            }))
                        }
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                status: e.target.value,
                            }))
                        }
                        className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Save Changes
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
