import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AppState } from '../services/appState.state';
import { PagePath } from '../enums/path.enum';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): boolean => {
  const router = inject(Router);
  const isLoggedIn = inject(AppState).isLoggedInState();
  if (isLoggedIn) {
    return true;
  }

  router.navigate([PagePath.LOGIN], {
    queryParams: { returnUrl: route.routeConfig?.path },
  });
  return false;
};
