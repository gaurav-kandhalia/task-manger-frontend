
import AuthForm from "./AuthForm";
import { useAuth } from '../../context/AuthContext';
const RegisterUser = ()=>{
  const {handleInputChange,register,authMsg,isAuthenticated} = useAuth()
    const formFields = [
        { label: " fullname", id: "Name", name: "fullname", type: "text"  },
        { label: "Email", id: "Email", name: "email", type: "email" },
        { label: "Password", id: "Password", name: "password", type: "password" }
      ];
      const message = authMsg?.success || authMsg?.error || '';
    return (
    <>
    {
      !isAuthenticated
       &&
      <AuthForm
      formFields={formFields}
      title="Register"
      buttonLabel="Register"
      footerText="Already have an account?"
      footerLink="/login"
      handleInputChange={handleInputChange}
      submitForm= {register}
      msg={message}
      
    />
    }
    </>
   
    )
}

export default RegisterUser;