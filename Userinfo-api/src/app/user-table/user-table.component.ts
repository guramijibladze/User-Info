import { Component, Input, OnInit } from '@angular/core';
import { Users } from '../usersModel';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @Input()
  allUsers:Users[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
