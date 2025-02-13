"use client"
import { useState } from "react";
import RegisterUser from "./Auth/Register";
import Login from "./Auth/Login";
import { useAuth } from "../context/AuthContext";
import TaskForm from "./Tasks/TaskForm";
const Header = () => {
   const {isAuthenticated,logout,downloadPdf,setOpenCount,openCount,isModalOpen,setModal} = useAuth()
   const [openTaskForm,setTaskForm] = useState(false)

    
    const [modalType,setModalType] = useState('')

    const openModal=(type)=>{
            setModal(true);
            setModalType(type)

            setOpenCount(0)
    }

    const closeModal = ()=>{
        setModal(false);
        setModalType('')
        setOpenCount(1)
    }

 

       
    return (
        <>
            <header className="bg-white">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block text-teal-600" href="#">
                        <span className="sr-only">Home</span>
                        Task Manager
                    </a>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                        
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-4">
                                <button
                                className={`rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 
                                    ${isAuthenticated ? "hidden" : ""}`}
                
                                    onClick={() => openModal("login")}
                                >
                                    Login
                                </button>


                                <button
                                    className={`rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 
                                        ${isAuthenticated ? "hidden" : ""}`}
                                    onClick={() => openModal("register")}
                                >
                                    Register
                                </button>
                               {
                                isAuthenticated &&
                                <button
                                className={`rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 
                                    `}
                                onClick={() => logout()}
                            >
                                logout
                            </button>
                               }
                               {
                                isAuthenticated &&
                                <button
                                className={`rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 
                                    `}
                                onClick={() => openModal('addTask')}
                            >
                                AddTask
                            </button>
                               }
                               {
                                isAuthenticated &&
                                <button
                                className={`rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 
                                    `}
                                onClick={() => downloadPdf()}
                            >
                                Dowload Pdf
                            </button>
                               }
                              

                            </div>
                        </div>
                    </div>
                </div>
            </header>

              {
                isModalOpen && openCount===0 &&
                <div className="">
                 <div className="flex justify-center ">
                    <button className={`rounded-full border-2 border-gray-500 w-9 h-9 font-bold text-red-800 text-2xl absolute `} onClick={closeModal}>x</button>
                 </div>
                     
              </div>
              }

{
                        isModalOpen && modalType==='login' && <Login/>
                     }
                     {
                        isModalOpen && modalType==='register' && <RegisterUser/>
                     }
                     {
                        isModalOpen && modalType==='addTask' && <TaskForm buttonName={'Add Task'}/>
                     }
                    
          
        </>
    )
}

export default Header;