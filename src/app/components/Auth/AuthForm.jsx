import React from 'react';
import InputField from './InputField'; 

const AuthForm = ({ formFields, buttonLabel, footerText, footerLink, title,handleInputChange,submitForm,msg }) => {
  return (
    <section className="bg-gray-900   border-2 ">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            

            <h1 className="mt-6 text-2xl font-bold text-gray-100 sm:text-3xl md:text-4xl">
              {title}
            </h1>

            <form action="#" className="mt-8 grid grid-cols-6 gap-6"
             onSubmit={(e) => {
              e.preventDefault(); 
              submitForm(); 
            }}  
            >
              {formFields.map((field) => (
                <InputField key={field.id} {...field} handleInputChange={handleInputChange}/>
              ))}

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                
                >
                  {buttonLabel}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  
                
                  
                </p>
              </div>

              <div className=' text-green-700'>
                <h1>{msg}</h1>
              </div>
            </form>

            <div>{msg}</div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthForm;
