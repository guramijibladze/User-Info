import { TreeError } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class FacadeClass{


    constructor(){}

    
    nameValidatorMessages = {
        required: 'Please enter your name.',
        minlength: 'The first name must be longer than 3 characters.'
      }
   
    lastNameValidatorMessages = {
        required: 'Please enter your last name.',
        minlength: 'The last name must be longer than 3 characters.'
      }

}