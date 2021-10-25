import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { MessagesService } from './services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ LoadingService, MessagesService ]
})
export class AppComponent {
  title = 'Userinfo-api';
}
