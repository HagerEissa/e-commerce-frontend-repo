import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _authS = inject(AuthService);
  const _router = inject(Router);
  if(_authS.isAuthanticated() ){
    if(_authS.isAdmin()){
      return true;
    }else{
      _router.navigate(['/']);
    return false;
    }

  }
  else
  {
    _router.navigate(['/login']);
    return false;
  }
};

