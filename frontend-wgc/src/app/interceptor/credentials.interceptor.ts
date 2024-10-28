import { HttpInterceptorFn } from '@angular/common/http';

export const withCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
    const reqWithCredentials = req.clone({
      withCredentials: true
    });
    return next(reqWithCredentials);
  };
  