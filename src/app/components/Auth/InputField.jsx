const InputField = ({ label, id, name, type = "text",handleInputChange }) => {
    return (
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor={id} className="block text-sm font-medium text-gray-400">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          onChange={handleInputChange}
          className="py-2 mt-1 w-full border-2 rounded-md border-gray-900 bg-white text-sm text-gray-700 shadow-xs"
        />
      </div>
    );
  };
  
  export default InputField;
  
