import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { useUserStore } from '@/stores/UserStore';
import { useAuthApi } from '@/api/auth/hook';

function AuthGuard({children}:{children: ReactNode}) {
  const {user} = useUserStore();
  const {loading, getUser, logout} = useAuthApi()
  const navigate = useNavigate();
  console.log(user)
  useEffect(()=>{
    if(user===null) {
      const email = localStorage.getItem('email')
      if(email) {
        getUser(email)
      } else {
        logout()
      }
    }
  }, [user])

  if(user === undefined || loading)
    return (
      <Loading />
    );
  else if(user === null) {
    navigate('/')
  }
  else
    return <>{children}</>
  return <></>
}

export default AuthGuard
