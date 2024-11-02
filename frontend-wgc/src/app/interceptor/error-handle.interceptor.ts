import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { ROUTE } from '../shared/routes.enum';



export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError( error => {
            if(error.status === 403 || error.status === 401){
               window.location.href=ROUTE.HOME;
            }
            return EMPTY;
        })
    );
  };
  