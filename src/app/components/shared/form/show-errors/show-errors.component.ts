import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from "@angular/forms";


@Component({
  selector: 'show-errors',
  template: `
   <ul class="alert alert-danger" *ngIf="shouldShowErrors()">
     <li *ngFor="let error of listOfErrors()">{{error}}</li>
   </ul>
 `,
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent  {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'Enter a valid email. ',
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }



}
