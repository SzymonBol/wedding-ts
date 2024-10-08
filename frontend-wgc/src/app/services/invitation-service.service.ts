import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Invitation } from '../types/guests-store-data.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private http = inject(HttpClient);

  public fetchInvitationData(id: string): Observable<Invitation>{
    return this.http.get<Invitation>('/invitation/'+ id);
  }

  public updateInvitationData(invitation: Invitation): Observable<Invitation>{

    const headers = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    
    return this.http.patch<Invitation>('/update-invitation', invitation, {headers});
  }

}
