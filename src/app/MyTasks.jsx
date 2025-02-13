"use client"
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext"
import TaskForm from "./components/Tasks/TaskForm";

const MyTasks = ()=>{
      const {getTasks,myTasks,deleteTask,downloadPdf,url} = useAuth()
      const [isOpenModal,setModal] = useState(false);
      const [taskId,setTaskId] = useState(null);
      const [type,setType] = useState('')

      const openModal = (type,taskId)=>{
        setModal(true);
        setType(type);
        setTaskId(taskId)
      }
      const closeModal = ()=>{
        setModal(false);
      }
    
      useEffect(() => {
        getTasks();
    }, []);



      return (
        <>

        { !isOpenModal &&
          myTasks.length !==0 &&
         myTasks.map((val,index)=>{
          return (
       
          <article className="rounded-xl border border-gray-700 bg-gray-800 p-4 mt-4 w-[70%] mx-auto" key={val._id}>
  <div className="flex items-center gap-4 " >
    

    <div>
      <h3 className="text-lg  text-white uppercase font-semiBold">{val.title}</h3>

      
    </div>
  </div>

  <ul className="mt-4 space-y-2">
    <li>
      <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
       

        <p className="mt-1 text-xs font-medium text-gray-300 ">
          {val.description}
        </p>
        <p className="mt-1 text-xs font-medium text-gray-300">
          {val.dueDate}
        </p>
        <p className="mt-1 text-xs font-medium text-green-700">
          {val.status}
        </p>
        
      </a>

      

<button
  className="inline-block rounded-md border border-indigo-600 bg-indigo-600 px-4 py-1 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden mt-2"
  onClick={()=>deleteTask(val._id)}
>
  delete
</button>

{/* Border */}

<button
  className="inline-block rounded-md border border-indigo-600  px-4 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden mt-2 ml-2"
  onClick={()=>openModal('edit',val._id)}
>
  edit
</button>
    </li>

 
  </ul>
</article>
          )
         })
         
       
        }
      
     
       {
        isOpenModal && 
        <div className="flex justify-center">
        <button className="border-2 border-gray-600 rounded-full w-10 h-10" onClick={closeModal}>X</button>
        
       </div>
       }

{
  isOpenModal && (
    type === 'addTask' 
      ? <TaskForm title={'Add your Task'} buttonName={'add'}/> 
      : <TaskForm title={'Update Task'} buttonName={'update'} taskId={taskId} />
  )
}

        </>
      )
}

export default MyTasks;