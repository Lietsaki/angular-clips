import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  credentials = {
    email: '',
    password: '',
  };
  showAlert = false;
  alertMsg = "Please wait! We're logging you in";
  alertColor = 'Blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      const loginData = await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );

      console.log(loginData);
    } catch (error) {
      this.inSubmission = false;
      this.alertMsg = 'An unexpected error occurred, please try again later';
      this.alertColor = 'red';
      return;
    }

    this.alertMsg = 'Success! You are now logged in';
    this.alertColor = 'green';
  }
}
