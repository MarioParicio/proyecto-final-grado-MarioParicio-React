import { useContext } from "react";
import LoginContext from "../context/LoginProvider";

const useLogin = () => useContext(LoginContext);


export default useLogin;
