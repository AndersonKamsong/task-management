import React, { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import SweetAlert2 from 'react-sweetalert2';

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [swalProps, setSwalProps] = useState({});

    useEffect(()=>(
        handleSubmit()
    ))
    
    const handleSubmit = async (e) => {
        try {
            let result = await TaskService.getAllUserTask()
            // console.log(result);
            setTasks(result.tasks)
            setTimeout(() => {
            }, 1000);
        } catch (error) {
            window.location = '/login'
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-[#f4d03f] flex items-center justify-center font-montserrat">
            <div className="w-full max-w-md bg-[#263d3d] p-8 rounded-lg shadow-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Task name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Start Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                End Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.name}
                                </th>
                                <td class="px-6 py-4">
                                    {task.startDate}
                                </td>
                                <td class="px-6 py-4">
                                    {task.endDate}
                                </td>
                                <td class="px-6 py-4">
                                    {task.status}
                                </td>
                                <td class="px-6 py-4">
                                    edit
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default HomePage;
