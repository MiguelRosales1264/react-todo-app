const todoStructure = {
    id: string,
    name: string,
    category: 'Work' | 'Personal' | 'Health' | 'Planning' | 'Other',
    timeEstimate: Number, // in minutes
    dueDate: Date,
    scheduledTime: Date | null,
    completed: Boolean,
    priority: 'Low' | 'Medium' | 'High' | 'Critical',
    status: 'Todo' | 'In Progress' | 'Done',
    createdAt: Date,
    updatedAt: Date,
};
