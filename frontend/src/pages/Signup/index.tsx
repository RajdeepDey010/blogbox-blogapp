import { useAuthApi } from '@/api/auth/hook';
import { ISignupRequest } from '@/api/types';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Signup() {
  const { loading, signup } = useAuthApi()

  const defaultFormData: ISignupRequest = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: new Date()
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ISignupRequest>({
    mode: "all",
    defaultValues: defaultFormData
  });
  const watchDate = watch("dob")
  const submitForm: SubmitHandler<ISignupRequest> = (formData, event) => {
    event?.preventDefault();
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
            <div className='flex flex-col'>
              <Label>Date of birth</Label>
              <span className='h-1'></span>
              <Popover>
                <PopoverTrigger asChild >
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !watchDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watchDate ? format(watchDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={watchDate}
                    onSelect={(value)=>{
                      if(value)
                        setValue("dob", value)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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