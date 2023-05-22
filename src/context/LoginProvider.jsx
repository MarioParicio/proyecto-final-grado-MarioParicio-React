import { createContext, useEffect, useState} from "react";
import { auth,  firestore  } from '../firebase'; // Import your Firebase auth instanceimport 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from "firebase/compat/app";




const  LoginContext = createContext();



const LoginProvider = ({children }) => {
    const [role, setRole] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);z
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          setCurrentUser(user);
          if (user) {
            // Obtener el rol del usuario de Firestore después de iniciar sesión
            const userRef = firestore.collection('users').doc(user.uid);
            console.log(userRef);
            const doc = await userRef.get();
            setRole(doc.data().role);  // Establecer el rol en el estado
            
          }
          setLoading(false);  // Set loading to false when user state is received
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, []);
      if (loading) {
        return  <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-32 w-32 border-t-4 border-green-500 rounded-full"></div>
    </div> // Or return null if you don't want to render anything
      }
      const logout = async () => {
        console.log("logout");
        try {
            await auth.signOut();
            toast.success("Has cerrado la sesión con éxito");
            return true;
        } catch (error) {
            toast.error(`Error al cerrar la sesión: ${error.message}`);
            return false;
        }
    }
    const addUserToFirestore = async (uid, email, role, name = null) => {
        const platform = "web";
        const userRef = firestore.collection('users').doc(uid); // Use uid instead of email
        const state = "active";
        const doc = await userRef.get(); 
        if (!doc.exists) {
            await userRef.set({ 
                email, 
                role,
                name,
                state,
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
                    platform,  
                })
            });
        }
    };
    
    const login = async (email, password) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const { user } = userCredential;  // Desestructurar user del objeto userCredential
            toast.success("Inicio de sesión exitoso");
            await addUserToFirestore(user.uid, email, "user");  // Pasar el uid del usuario
            return true; // Return true on success
        } catch (error) {
            toast.error(`Error en el inicio de sesión: ${error.message}`);
            console.error(error);
            return false; // Return false on failure
        }
    };
    
    const register = async (email, password, name) => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const { user } = userCredential;  // Desestructurar user del objeto userCredential
            toast.success("Registro exitoso");
            await addUserToFirestore(user.uid, email, "user", name);  // Pasar el uid del usuario
            return true;
        } catch (error) {
            toast.error(`Error en el registro: ${error.message}`);
            return false;
        }
    };
    return (
        <LoginContext.Provider
            value={{
                register,
                login,
                currentUser, 
                logout,
                role
            }}
        >
        {children}    </LoginContext.Provider>

    )
}
export {
    LoginProvider
}
export default LoginContext;