import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiAddressInterceptor: HttpInterceptorFn = (req, next) => {
  const api = environment.apiUrl;
  const reqWithApiUrl = req.clone({
    url: api + req.url
  });
  return next(reqWithApiUrl);
};
