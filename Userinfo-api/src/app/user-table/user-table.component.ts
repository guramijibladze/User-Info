import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { UsersService } from '../services/users.service';

import { DialogUser, Users } from '../usersModel';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  tableColString:string[] = ['#', 'name', 'lastname', 'email', 'age', 'avatar'];

  form:FormGroup;
  dialogUser:DialogUser;

  @Input()
  allUsers:Users[]

  @Output()
  private usersListUpdate = new EventEmitter()
  
  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private loadingService: LoadingService,
              private usersService: UsersService) {}

  ngOnInit(): void {
  }

  openDialog(content, user:Users){
    this.dialogUser = user;

    this.form = this.fb.group({
      name:[this.dialogUser.name],
      lastName:[this.dialogUser.lastName],
      age:[this.dialogUser.age],
      email:[this.dialogUser.email],
    })

    this.modalService.open(content, { centered: true });
  }

  saveUser(){
    const changes = this.form.value
    this.usersService.userEdit(this.dialogUser.id, changes)
    .pipe(
      filter( val => !!val),
      tap(() => this.usersListUpdate.emit())
    )
      .subscribe(
        () => {
          this.modalService.dismissAll();
        }
      )
  }


  // hover(s){
    
  //   console.log(s)
  // }

  delete(user){
    this.loadingService.loadingOn();
    this.usersService.userDelete(user.id)
      .pipe(
        // finalize(() => this.loadingService.loadingOff()),
        tap(() => this.usersListUpdate.emit())
      )
      .subscribe()
    // console.log(x.id)
  }
}
