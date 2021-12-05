import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class FacadeClass{


    constructor(
      private usersService: UsersService,
      private loadingService: LoadingService
    ){}

    
    nameValidatorMessages = {
        required: 'Please enter your name.',
        minlength: 'The first name must be longer than 3 characters.'
      }
   
    lastNameValidatorMessages = {
        required: 'Please enter your last name.',
        minlength: 'The last name must be longer than 3 characters.'
      }


      addUser(user){
        this.loadingService.loadingOn();
        this.usersService.userPost(user)
          .pipe(
            finalize(() => this.loadingService.loadingOff())
          )
          .subscribe()
      }

}