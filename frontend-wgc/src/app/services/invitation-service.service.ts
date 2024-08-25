import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Invitation } from '../types/guests-store-data.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private http = inject(HttpClient);

  constructor() { }

  public fetchInvitationData(id: string): Observable<Invitation>{
    return this.http.get<Invitation>('http://localhost:8080/invitation/'+ id);
  }

}
