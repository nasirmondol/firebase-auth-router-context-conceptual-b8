import { useContext } from "react";
import { CreateContext } from "../Provider/AuthProvider";

const useAuth = () => {
   const all = useContext(CreateContext);
   return all;
};

export default useAuth;