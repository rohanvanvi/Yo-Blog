import { useDispatch } from "react-redux";
import authservice from '../../appwrite/auth.js';
import { logout } from '../../store/authSlice.js';

function LogoutBtn() {
  const dispatch = useDispatch();

  function handleLogout() {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  }

  return (
    <button
      onClick={handleLogout}
      className="
        inline-flex items-center justify-center px-5 py-2
        bg-blue-600 text-white font-semibold
        rounded-full shadow-md transition-all duration-200
        hover:bg-blue-700 hover:scale-105 hover:shadow-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        tracking-wide"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
