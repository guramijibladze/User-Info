import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Observable, of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { UsersService } from '../services/users.service';
import { DialogUser } from '../usersModel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  userName$:Observable<DialogUser[]>;
  userObj = {
    name: ''
  }

  constructor(private usersService: UsersService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  searchUser(){
    const userName = this.userObj.name;
    this.userName$ = this.usersService.searchUser(userName)

    this.userObj.name = '';
  }

  openDialog(content){
    this.modalService.open(content, { centered: true });
  }

    
 
}
