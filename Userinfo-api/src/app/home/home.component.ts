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

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadAllUsers()
  }

  loadAllUsers(){
    this.allUsers$ = this.usersService.loadAllUsers()
    this.allUsers$.subscribe(x => console.log(x)) 
  }
}
