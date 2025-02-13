import { useAuth } from "../../context/AuthContext"

const TaskForm = ({title,buttonName,taskId})=>{
const {setTask,handleTaskInputChange,editTask,taskUpdatedMsg} = useAuth()

return (
    <section className="bg-white border-2 border-red-950">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
   

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <a className="block text-blue-600" href="#">
          <span className="sr-only">Home</span>
          
        </a>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          {title}
        </h1>

       

        <form action="#" className="mt-8 grid grid-cols-6 gap-6" 
         onSubmit={(e) => {
              e.preventDefault(); 
              buttonName === 'add' ? setTask() : editTask(taskId); 
            }}  >
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 w-full py-2 border-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              onChange={handleTaskInputChange}
            />
          </div>

         

          <div className="col-span-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700"> description </label>

            <input
              type="description"
              id="description"
              name="description"
              className="mt-1 w-full py-2 border-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              onChange={handleTaskInputChange}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700"> dueDate </label>

            <input
              type="Date"
              id="dueDate"
              name="dueDate"
              className="mt-1 w-full border-2 py-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              onChange={handleTaskInputChange}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="duestatusate" className="block text-sm font-medium text-gray-700"> status </label>

            <select
  id="status"
  name="status"
  className="mt-1 w-full border-2 py-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
  onChange={handleTaskInputChange}
>
  <option value="choose">choose below</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
              type="submit" 
            >
              {buttonName}
            </button>

           
          </div>
        </form>

        <div className=" text-green-700">
          {taskUpdatedMsg}
        </div>
      </div>
    </main>
  </div>
</section>
)
}

export default TaskForm