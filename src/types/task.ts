export interface Task {
    _id: number;
    name: string;
    status: "Pending" | "in Progress" | "Completed";
    priority: "High" | "Medium" | "Low";
    description: string;
}