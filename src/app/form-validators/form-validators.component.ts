import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-validators',
  templateUrl: './form-validators.component.html',
  styleUrls: [
    './form-validators.component.scss',
    '../../assets/bootstrap.css'
  ]
})
export class FormValidatorsComponent implements OnInit {

  public answers = [
    { type: 'yes', text: 'Yes' },
    { type: 'no', text: 'No' }
  ];

  public characterLength = 6;
  public form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email], this.checkAsynchValueForEmail),
        password: new FormControl('', [Validators.required, this.checkPasswordLength.bind(this)]),
      }),
      country: new FormControl('ru'),
      answer: new FormControl('no'),
    });
  }

  public checkPasswordLength(control: FormControl) {
    if (control.value.length <= this.characterLength) {
      return { 'passwordInvalid': true };
    }
    return null;
  }

  public checkAsynchValueForEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@mail.ru') {
          resolve({
            'emailIsAlreadyExists': true
          });
        } else {
          resolve(null);
        }
      }, 3000); // emulate asynch validator
    })
  }

  public onSubmit() {
    console.log(this.form);
  }

}
