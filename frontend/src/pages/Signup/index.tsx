import { useAuthApi } from '@/api/auth/hook';
import { ISignupRequest } from '@/api/types';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Signup() {
  const { loading, signup } = useAuthApi()

  let a = new Date();
  let day = String(a.getDate()).padStart(2, '0');
  let month = String(a.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  let year = a.getFullYear();
  let formattedDate = `${day}/${month}/${year}`;

  const defaultFormData: ISignupRequest = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: formattedDate
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupRequest>({
    mode: "all",
    defaultValues: defaultFormData
  });

  const submitForm: SubmitHandler<ISignupRequest> = (formData, event) => {
    event?.preventDefault();
    console.log(formData)
    if (Object.keys(errors).length === 0)
      signup(formData)
  };


  return (
    <>
      {loading && <Loading />}
      <div className='grid place-items-center h-full'>
        <div className='flex-1 w-[400px]'>
          <div className='text-center'>
            <span className='px-2 py-1 font-bold dark:text-white text-4xl'>
              SignUp
            </span>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-4 p-4'>
            <div>
              <Label htmlFor='firstname'>Firstname</Label>
              <Input
                type='text'
                placeholder='Firstname'
                id='firstname'
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "Firstname cannot be empty"
                  }
                })}
              />
              {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label htmlFor='lastname'>Lastname</Label>
              <Input
                type='text'
                placeholder='Lastname'
                id='lastname'
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Lastname cannot be empty"
                  }
                })}
              />
              {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
            </div>
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
                placeholder='Password'
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
              Sign Up
            </Button>

          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup