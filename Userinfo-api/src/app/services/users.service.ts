import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Users } from '../usersModel';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  loadAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(`http://localhost:3000/users`)
  }

  usersUntil30():Observable<Users[]>{
    return this.http.get<Users[]>(`http://localhost:3000/users`)
      .pipe(
        map( val => val.filter(val => val.age < 30))
      )
  }

  usersAfter30():Observable<Users[]>{
    return this.http.get<Users[]>(`http://localhost:3000/users`)
      .pipe(
        map( val => val.filter( val => val.age > 30))
      )
  }
}
