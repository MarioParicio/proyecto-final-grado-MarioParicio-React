import { createContext} from "react";
import { auth } from '../firebase'; // Import your Firebase auth instance
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';







const  LoginContext = createContext();



const LoginProvider = ({children }) => {

    const register = async (email, password) => {
        try {
            toast.success("Registro exitoso");
            await auth.createUserWithEmailAndPassword(email, password);
     
            return true;
        } catch (error) {
            toast.error(`Error en el registro: ${error.message}`);
            return false;
        }
    }
    
    const login = async (email, password) => {
        try {
          await auth.signInWithEmailAndPassword(email, password);
          toast.success("Inicio de sesión exitoso");
          return true; // Return true on success
        } catch (error) {
          toast.error(`Error en el inicio de sesión: ${error.message}`);
          return false; // Return false on failure
        }
      }
    
    return (
        <LoginContext.Provider
            value={{
                register,
                login
            }}
        >
        {children}    </LoginContext.Provider>

    )
}
export {
    LoginProvider
}
export default LoginContext;