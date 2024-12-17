import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="w-full min-h-screen bg-white text-gray-800 flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  ) : (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default App;
