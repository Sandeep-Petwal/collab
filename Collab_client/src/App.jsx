// App.jsx or similar
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout.jsx';
import Login from './pages/Login';
import { Toaster } from "@/components/ui/toaster"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, login } from './state/docSlice';
import axiosInstance from './api/axios.js';

function App() {
  const user = useSelector((state) => state.doc.user)
  const dispatch = useDispatch()

  // verify user by token
  const verifyUser = async () => {
    const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/auth/verify-token`);
    if (response.data.success) {
      dispatch(login(response.data.data));
    }
    dispatch(setLoading(false));
  };


  // if tokne is present and loading is true and verify user by token
  if (localStorage.getItem("token") && user.loading) {


    verifyUser();

    document.title = "Loading...";
    return (
      <div className="flex justify-center flex-col items-center h-screen text-white bg-gray-800">
        <h1 className="text-6xl font-serif flex justify-center items-center flex-col text-center">
          <div className="mb-4">{'Docs'.split('').map((letter, index) => (
            <span key={index} className="inline-block animate-bounce font-bold" style={{ animationDelay: `${index * 50}ms` }}>{letter}</span>
          ))}</div>
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </h1>
      </div>
    );
  }

  document.title = "Docs";

  return (
    <>
      {
        user.isLoggedIn ?

          <DashboardLayout>
            <Outlet />
            <Toaster />
          </DashboardLayout >
          :
          <Login />
      }



    </>
  );
}

export default App;
