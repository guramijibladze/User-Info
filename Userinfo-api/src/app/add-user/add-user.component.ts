import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import { FacadeClass } from './facade.component';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [FacadeClass]
})
export class AddUserComponent implements OnInit {
  userForm:FormGroup

  constructor(private fb:FormBuilder,
              private facade: FacadeClass,
              private dialogRef: MatDialogRef<AddUserComponent>,
              private usersService: UsersService) { }


  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      lastName: ['',[Validators.required, Validators.minLength(3)]],
      age: ['',[Validators.min(18), Validators.max(65)]],
      email: ['',[Validators.required, Validators.email]]
    })

    const nameControl = this.userForm.get('name')
    nameControl.valueChanges.subscribe(
      value => this.setMessages(nameControl)
    )

    const lastNameControl = this.userForm.get('lastName');
    lastNameControl.valueChanges.subscribe(
      value => this.lastNamesetMessages(lastNameControl)
    )
  }

  nameMessage:string;
  setMessages(c:AbstractControl):void{
    this.nameMessage = '';
    if((c.touched || c.dirty) && c.errors){
      this.nameMessage = Object.keys(c.errors).map(
        key => this.facade.nameValidatorMessages[key]
      ).join('')
    }
  }
  
  lastNameMessage:string;
  lastNamesetMessages(c:AbstractControl):void{
    this.lastNameMessage = '';
    if((c.touched || c.dirty) && c.errors){
      this.lastNameMessage = Object.keys(c.errors).map(
        key => this.facade.lastNameValidatorMessages[key]
      ).join('')
    }
  }
  
  
  saveForm(){
    console.log(this.userForm.value)
    const newUser = this.userForm.value
    this.usersService.userPost(newUser).subscribe(
      res => console.log(res)
    )
    this.dialogRef.close()
  }

}
