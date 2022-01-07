import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

const useAuth = (initial) => {

    const [isAuth , setIsAuth] = useState(false)
    const [isLoading , setIsLoading] = useState(true)
    const [user , setUser] = useState(null)

    useEffect(() => {
        
        const auth = async() => {

            console.log('use auth');
            const cookie = Cookies.get('x-auth-token');

            if(!cookie){
                setIsAuth(false);
                setIsLoading(false);
                return;
            }

            try {
                
                const res = await axios.get(process.env.REACT_APP_BACKEND_API_URL + 'isauthenticated/?cookie=' + cookie);

                if(res.status === 200){

                    setUser(res.data.user)
                    setIsAuth(true);
                    setIsLoading(false);
                    return;

                }

                setIsAuth(false)
                setIsLoading(false)

            } catch (error) {
                setIsAuth(false)
                setIsLoading(false)
                window.location = '/error'
            }

        }

        window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/contact' && auth();

    },[])

    const login = async({email , password}) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
              process.env.REACT_APP_BACKEND_API_URL + "login",
              {
                email: email,
                password: password,
              }
            );
            if (response.data.credentials === "valid") {
              Cookies.set("x-auth-token", response.data.token, { expires: 7 });
              setUser(response.data.user)
              setIsAuth(true);
              setIsLoading(false);
              window.location = "/home";
            } else {
                setIsAuth(false)
                setIsLoading(false)
              return {error : "Invalid credentials!"}
            }
          } catch (error) {
            setIsAuth(false)
            setIsLoading(false)
            window.location = "/error";
          }
    }

    const signup = async({formData}) => {
        
      try {

        setIsLoading(true);

        const response = await axios.post(
          process.env.REACT_APP_BACKEND_API_URL + "signup",
          formData
        );
  
        if (response.data.credentials === "valid") {
          Cookies.set("x-auth-token", response.data.token, { expires: 7 });
          setUser(response.data.user)
          setIsAuth(true);
          setIsLoading(false);
          window.location = "/home";
        }else{
          setIsAuth(false)
          setIsLoading(false)
          return {error : "Email is already taken!"}
        }
        
      } catch (error) {
        setIsAuth(false)
        setIsLoading(false)
        window.location = '/error'
      }

    }

    return (
        { isAuth , isLoading ,user, login , signup }
    )
}

export default useAuth
