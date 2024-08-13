import { ILoginRequest } from '@/api/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuthApi } from '@/api/auth/hook'
import Loading from '@/components/Loading'

function Signin() {
  const { loading, login } = useAuthApi()
  const defaultFormData: ILoginRequest = {
    email: "",
    password: ""
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    mode: "all",
    defaultValues: defaultFormData
  });

  const submitForm: SubmitHandler<ILoginRequest> = (formData, event) => {
    event?.preventDefault();
    console.log(formData)
    if (Object.keys(errors).length === 0)
      login(formData)
  };

  return (
    <>
      {loading && <Loading />}
      <div className='grid place-items-center h-full'>
        <div className='flex-1 w-[400px]'>
          <div className='text-center'>
            <span className='px-2 py-1 font-bold dark:text-white text-4xl'>
              SignIn
            </span>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-4 p-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                placeholder='name@company.com'
                id='email'
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email cannot be empty"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Not a valid email address"
                  }
                })}
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                placeholder='**********'
                id='password'
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password cannot be empty"
                  }
                })}
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <Button
              type='submit'
              disabled={Object.keys(errors).length !== 0}
            >
              Sign In
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/signup' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin
