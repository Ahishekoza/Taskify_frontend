import { useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useAuth } from "@/context/AuthContextProvider";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {toast} = useToast()
  const navigate = useNavigate()
  const { Login, isloading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    Login(formData.email, formData.password)
    setFormData({email:'',password:""})
    toast({
      color: "bg-green-700",
      description: "Successfully Logged In !",
    })
    
    navigate('/')
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sunt dolores deleniti inventore quaerat mollitia?
          </p>

          <form
           
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  autoComplete="username"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdOutlineAlternateEmail />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  minLength="8"
                  maxLength="20"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                  title="Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
                  placeholder="Enter password"
                  autoComplete="current-password"
                />

                <button
                  onClick={handleShowPassword}
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                >
                  {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
                </button>
              </div>
            </div>

            {isloading ? (
              <Button disabled className="w-full">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <button
                type="submit"
                onClick={handleLoginSubmit}
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>
            )}

            <p className="text-center text-sm text-gray-500">
              No account?
              <a className="underline ml-1" href="#">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
