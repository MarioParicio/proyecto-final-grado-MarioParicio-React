import { createContext, useEffect, useState} from "react";
import { auth,  firestore  } from '../firebase'; // Import your Firebase auth instanceimport 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import firebase from "firebase/compat/app";



const  LoginContext = createContext();



const LoginProvider = ({children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          setLoading(false);  // Set loading to false when user state is received
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, []);
      if (loading) {
        return <div>Loading...</div>;  // Or return null if you don't want to render anything
      }

    const addUserToFirestore = async (email, role, name = null) => {
        const platform = "web";
        const userRef = firestore.collection('users').doc(email); 
        const doc = await userRef.get(); 
        if (!doc.exists) {
            await userRef.set({ 
                email, 
                role,
                name,
                logs: [{
                    loginTime: new Date(),
                    platform
                }]
            }); 
        } else {
            // If user exists, update the logs
            await userRef.update({
                logs: firebase.firestore.FieldValue.arrayUnion({
                    loginTime: new Date(),
                    platform
                })
            });
        }
    };
    
    const login = async (email, password) => {
        try {
          await auth.signInWithEmailAndPassword(email, password);
          toast.success("Inicio de sesión exitoso");
          await addUserToFirestore(email, "user");
          return true; // Return true on success
        } catch (error) {
          toast.error(`Error en el inicio de sesión: ${error.message}`);
          console.error(error);
          return false; // Return false on failure
        }
      }
      const register = async (email, password, name) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            toast.success("Registro exitoso");
            await addUserToFirestore(email, "user", name);
            return true;
        } catch (error) {
            toast.error(`Error en el registro: ${error.message}`);
            return false;
        }
    }
    return (
        <LoginContext.Provider
            value={{
                register,
                login,
                currentUser
            }}
        >
        {children}    </LoginContext.Provider>

    )
}
export {
    LoginProvider
}
export default LoginContext;