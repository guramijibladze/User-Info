import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Users, DialogUser } from '../usersModel';
import { delay, finalize, map, shareReplay } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
    private loadingService: LoadingService) { }

  searchUser(username):Observable<DialogUser[]>{
    return this.http.get<DialogUser[]>(`http://localhost:3000/users`)
      .pipe(
        map( val => val.filter( val => val.name === username)),
      )
  }

  loadAllUsers():Observable<Users[]>{
    return this.http.get<Users[]>(`http://localhost:3000/users`)
      .pipe(delay(1500))
  }

  usersUntil30():Observable<Users[]>{
    return this.http.get<Users[]>(`http://localhost:3000/users`)
      .pipe(
        map( val => val.filter(val => val.age < 30)),
        delay(1500),
        shareReplay()
      )
  }

  usersAfter30():Observable<Users[]>{
    return this.http.get<Users[]>(`http://localhost:3000/users`)
      .pipe(
        map( val => val.filter( val => val.age > 30)),
        delay(1500),
        shareReplay()
      )
  }

  userEdit(userId, changes):Observable<Users>{
    return this.http.put<Users>(`http://localhost:3000/users/${userId}`, changes)
  }

  userPost(newUser):Observable<Users>{
    return this.http.post<Users>('http://localhost:3000/users', newUser)
    .pipe(delay(1500))
  }
}
