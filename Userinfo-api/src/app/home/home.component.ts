import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private usersService: UsersService) { }

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
    this.allUsers$ = this.usersService.loadAllUsers()
  }

  loadUsersuntil30(){
    this.allUsers$ = this.usersService.usersUntil30()
  }

  loadUsersAfter30(){
    // console.log(this.activeButton)
    this.allUsers$ = this.usersService.usersAfter30()
  }
}
