import CommonForm from "@/components/common/CommonForm";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast"
import { loginUser } from "@/redux/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: '',
    password: ''
   }
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();


    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser(formData)).then((data) => {
        console.log(data)
        if(data?.payload?.success) {
          toast({
            title: data?.payload?.message
          }) 
          navigate('/shop/home');
        }else{
          toast({
            variant: "destructive",
            title: data?.payload?.message
          })
        } 
      })
    }
  return (
    <>
    <div className="mx-auto w-full max-w-md space-y-6">
 <div className="text-center">
   <h1 className="text-3xl font-bold tracking-tight text-foreground">
   Sign In to your account
   </h1>
   <p className="mt-2">
     Do not have an account
     <Link
       className="font-medium ml-2 text-primary hover:underline"
       to="/auth/register"
     >
       Register
     </Link>
   </p>
 </div>
 <CommonForm 
   formControls={loginFormControls}
   buttonText={"Sign In"}
   formData={formData}
   setFormData={setFormData}
   onSubmit={onSubmit}
 />
</div>
</>
  )
}

export default Login