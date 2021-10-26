import { Component, Input, OnInit } from '@angular/core';
import { DialogUser } from '../usersModel';

@Component({
  selector: 'app-allsearchusers',
  templateUrl: './allsearchusers.component.html',
  styleUrls: ['./allsearchusers.component.scss']
})
export class AllsearchusersComponent implements OnInit {

  @Input()
  userName:DialogUser[]

  constructor() { }

  ngOnInit(): void {
  }

}
