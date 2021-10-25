import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Users } from '../usersModel';
import { delay, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  loadAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(`http://localhost:3000/users`)
      .pipe(delay(2000))
  }

  usersUntil30():Observable<Users[]>{
    return this.http.get<Users[]>(`http://localhost:3000/users`)
      .pipe(
        map( val => val.filter(val => val.age < 30)),
        delay(2000),
        shareReplay()
      )
  }

  usersAfter30():Observable<Users[]>{
    return this.http.get<Users[]>(`http://localhost:3000/users`)
      .pipe(
        map( val => val.filter( val => val.age > 30)),
        delay(2000),
        shareReplay()
      )
  }

  userEdit(userId, changes):Observable<any>{
    return this.http.put(`http://localhost:3000/users/${userId}`, changes)
  }
}
