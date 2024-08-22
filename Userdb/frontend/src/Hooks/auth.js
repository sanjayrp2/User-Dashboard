import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');//Retrieves the token from localStorage
      // A web API that allows storing data in the browser.
      if (!token) { //Checks if the token does not exist
        navigate('/login');
      } else {
        try { //Attempts to verify the token by making an API request.
          const response = await axios.get('http://localhost:7000/protected-route', { //Makes a GET request to a protected route, including the token in the headers.
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.status !== 200) {
            navigate('/login');//If the response status is not 200, navigates to the login page.
          }
        } catch (error) {
          console.error('Authentication error:', error);
          navigate('/login');
        }
      }
    };

    checkAuth();
  }, [navigate]); //Exports the useAuth hook as the default export from this module, making it available for import in other parts of the application.
};

export default useAuth;
