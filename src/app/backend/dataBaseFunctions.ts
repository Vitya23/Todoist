import { Observable } from 'rxjs';
import { AuthRequestI } from '../auth/types/authRequest.interface';
import { UserI } from '../auth/types/users.interface';
import { userDataBase } from './dataBase';

export function loginFunction(request: AuthRequestI): Observable<any> {
  const user = userDataBase.users.find((x) => {
    return (
      x.email === request.user.email && x.password == request.user.password
    );
  });
  if (user) {
    return new Observable<UserI>((subscriber) => {
      subscriber.next(user);
    });
  } else {
    return new Observable<string>((subscriber) => {
      subscriber.error('Не правильный логин или пароль');
    });
  }
}
