"use client"

import {  createContext,useContext,useEffect,useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
const url=`https://taskmanager-wcm2.onrender.com/api/v1`;

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    })
    const [addTask,setAddTask] = useState({
      title:"",
      description:"",
      dueDate:"",
      status:"",
    })
    const [authMsg,setAuthMsg] = useState('')
    const [myTasks,setMyTasks] = useState([])
    const [accessToken,setAccessToken] = useState('');
    const [refreshToken,setRefreshToken] = useState('')
    const [taskUpdatedMsg,setTaskUpdatedMsg] = useState('');
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [openCount,setOpenCount] = useState(0);
    const [isModalOpen,setModal] = useState(false)

    useEffect(()=>{
        const token = Cookies.get("accessToken");
        if(token){
          setIsAuthenticated(true)
          setOpenCount(1);
        }
    },[])

    const handleInputChange = (e)=>{
        console.log("this handleInputChange function")
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleTaskInputChange=(e)=>{
      console.log("handle task input change")
      setAddTask({...addTask,[e.target.name]:e.target.value})
    }
    const register = async () => {
        console.log("register function")
        console.log(formData)
        try {
          const response = await axios.post(`${url}/user/register`, formData);
          console.log("Register Success:", response.data);
          if(response.data.success===true){

            Cookies.set("accessToken", response.data.data.accessToken, { expires: 3, secure: true });
            Cookies.set("refreshToken", response.data.data.refreshToken, { expires: 7, secure: true });
            setAccessToken(response.data.data.accessToken);
          setRefreshToken(response.data.data.refreshToken);
          setAuthMsg(response.data.message);
          setIsAuthenticated(true);
          setOpenCount(1)
          }
          
          
        } catch (error) {
          console.error("Register Error:", error);
        }
      };

      const login = async ()=>{
        try {
            const response = await axios.post(`${url}/user/login`, formData);
            console.log("login Success:", response.data);
            setAuthMsg(response.data.message)
            if(response.data.success===true){
              Cookies.set("accessToken", response.data.data.accessToken, { expires: 1, secure: true });
            Cookies.set("refreshToken", response.data.data.refreshToken, { expires: 7, secure: true });
              setAccessToken(response.data.data.accessToken);
            setRefreshToken(response.data.data.refreshToken);
            setAuthMsg(response.data.message);
            setIsAuthenticated(true);
            setOpenCount(1)
            }
            
          } catch (error) {
            console.error(" login Error:", error);
          }
      }

      const getTasks = async()=>{
        console.log("get Tasks function is called");

        console.log("................")
        const token = Cookies.get("accessToken")
        if (!token) {
          console.error("No access token found!");
          return;
      }
        try {
          
            const response = await axios.get(`${url}/user/myTasks`,{
              headers:{Authorization:`Bearer ${token}`}
            });
            console.log("myAll Tasks", typeof(response.data.data));
          setMyTasks(response.data.data)
            
          
          
        } catch (error) {
          console.error(" Error:", error);
        }
      }

      const deleteTask = async(taskId)=>
        {
          console.log("deletTask function is called")
        if(!taskId){
          console.error("taskId is not provided")
        }
        const token = Cookies.get("accessToken")
        if (!token) {
          console.error("No access token found!");
          return;
      }
      try {
          const response = await axios.delete(`${url}/user/deleteTask`,{
              headers:{Authorization:`Bearer ${token}`},
              data: { taskId: taskId }
            });
            console.log("Task Deleted:", response.data);
            getTasks();
      } catch (error) {
        console.error(error)
      }
      }

      const editTask = async(taskId)=>  {
        console.log("editTask function is called")
   
      const token = Cookies.get("accessToken");
      console.log(token)
      console.log(addTask)
      if (!token) {
        console.error("No access token found!");
        return;
    }
    try {
      const response = await axios.put(
        `${url}/user/editTask`,
        { taskId:taskId,...addTask }, 
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, 
        }
    );
          console.log("edited:", response.data);
         if(response.data.success===true){
          setTaskUpdatedMsg(response.data.message)
         }else{
          setTaskUpdatedMsg('something went wrong')
         }
          getTasks();
    } catch (error) {
      console.error(error)
    }
    }
      const setTask = async()=>  {
        console.log("editTask function is called")
   
      const token = Cookies.get("accessToken");
      console.log(token)
      console.log(addTask)
      if (!token) {
        console.error("No access token found!");
        return;
    }
    try {
      const response = await axios.post(
        `${url}/user/setTask`,
        { ...addTask }, 
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, 
        }
    );
          console.log("edited:", response.data);
          if(response.data.success===true){
            setTaskUpdatedMsg(response.data.message)
           }
           else if(response.data.success === false){
                 
           }
          getTasks();
    } catch (error) {
      console.error(error)
    }
    }

    const logout = async()=>{
      console.log("logout")
      const token = Cookies.get("accessToken");
    
      
      if (!token) {
        console.error("No access token found!");
        return;
    }
    try {
      const response = await axios.post(
        `${url}/user/logout`,
        { ...addTask }, 
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, 
        }
    );
          console.log("edited:", response.data);
          if(response.data.success===true){
            setAuthMsg(response.data.message)
           setIsAuthenticated(false);
           setOpenCount(0)
           Cookies.remove("accessToken")
           Cookies.remove("refreshToken")
           }
           else if(response.data.success === false){
                 setAuthMsg('something went wrong')
           }
          
    } catch (error) {
      console.error(error)
    }
    }

    const downloadPdf = async () => {
      console.log("Downloading PDF...");
    
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("No access token found!");
        return;
      }
    
      try {
        const response = await axios.get(`${url}/user/generatePdf`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", 
        });
        window.open(`${url}/user/generatePdf`)
        console.log("PDF Downloaded Successfully!");
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };
    

    return (
        <AuthContext.Provider value={{setModal,isModalOpen,setOpenCount,logout,openCount,formData,register,handleInputChange,authMsg,login,getTasks,myTasks,deleteTask,setTask,handleTaskInputChange,editTask,downloadPdf,url,taskUpdatedMsg,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);
