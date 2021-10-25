import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { MessagesService } from '../services/messages.service';
import { UsersService } from '../services/users.service';
import { Users } from '../usersModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allUsers$:Observable<Users[]>
  activeButton

  constructor(private usersService: UsersService,
              private loadingService: LoadingService,
              private messagesService: MessagesService ) { }

  ngOnInit(): void {
  }

  setActive(buttonName){
    this.activeButton = buttonName;
    if(this.activeButton === 'btn1'){
      this.loadAllUsers()
    }else if( this.activeButton === 'btn2'){
      this.loadUsersuntil30()
    }else{
      this.loadUsersAfter30()
    }

  }
  
  isActive(buttonName){
    return this.activeButton === buttonName;
  }


  loadAllUsers(){
    this.loadingService.loadingOn();
    this.allUsers$ = this.usersService.loadAllUsers()
      .pipe(
        finalize(() => this.loadingService.loadingOff()),
        catchError( err => {
          const message = "Could not load users";
          this.messagesService.showErrors(message);
          return throwError(err);
        })
      )
  }

  loadUsersuntil30(){
    this.loadingService.loadingOn()
    this.allUsers$ = this.usersService.usersUntil30()
      .pipe(
        finalize(() => this.loadingService.loadingOff())
      )
  }

  loadUsersAfter30(){
    this.loadingService.loadingOn()
    this.allUsers$ = this.usersService.usersAfter30()
      .pipe(
        finalize(() => this.loadingService.loadingOff())
      )
  }
}
