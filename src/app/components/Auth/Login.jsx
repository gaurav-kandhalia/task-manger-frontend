import AuthForm from "./AuthForm";
import { useAuth } from '../../context/AuthContext';

const Login = ()=>{
    const {handleInputChange,login,authMsg,openCount} = useAuth()
    const formFields = [
      
        { label: "Email", id: "Email", name: "email", type: "email" },
        { label: "Password", id: "Password", name: "password", type: "password" }
      ];

      return (
        <>
 {
  openCount===0 &&
  <AuthForm
      formFields={formFields}
      title="Log In"
      buttonLabel="Login In"
      
      footerLink="/Register"
      handleInputChange={handleInputChange}
      submitForm= {login}
    

    />
 }
        </>
      )
}

export default Login;