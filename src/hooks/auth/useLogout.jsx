import { useAuthContext } from '../useAuthContext';
import { usePhoto } from '../../components/MyProfileForm/PhotoForm/hooks/usePhoto';
import { usePhotoContext } from '../usePhotoContext';

export const useLogout = () => {
  const { dispatchAuth } = useAuthContext();
  const { dispatchPhoto } = usePhotoContext();

  const logout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('characteristics');
    sessionStorage.removeItem('profilePicture');

    dispatchAuth({type: 'LOGOUT'});
    dispatchPhoto({type: 'DELETE'});

  };

  return { logout };
};