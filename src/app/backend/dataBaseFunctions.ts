import { AuthRequestI } from '../auth/types/authRequest.interface';
import { UserI } from '../auth/types/users.interface';
import { userDataBase } from './dataBase';

export function loginFunction(request: AuthRequestI) {
  const user = userDataBase.users.find((x) => {
    return (
      x.email === request.user.email && x.password == request.user.password
    );
  });
  if (user) {
    return user;
  } else {
    throw new Error('Не правильный логин или пароль');
  }
}
