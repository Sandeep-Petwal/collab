import { useParams } from 'react-router-dom'
const VITE_API_URL = import.meta.env.VITE_API_URL;
import axiosInstance from '@/api/axios';
import { useEffect, useState } from 'react';

function Document() {
    const { id } = useParams()
    const [document, setDocument] = useState({});

    // get document by id
    useEffect(() => {
        const getDocument = async () => {
            const response = await axiosInstance.get(`${VITE_API_URL}/docs/get/${id}`);
            console.table(response?.data?.data);
        };
        getDocument();
    }, [id]);




    return (
        <div className="bg-zinc-900 text-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Document {id}</h1>
            <p className="text-lg mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quidem?
            </p>
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
        </div>
    )
}

export default Document
