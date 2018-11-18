import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  constructor() { }

  ngOnInit() {
  }
  handleLogin() {
    if (this.email && this.password) {
      console.log('submitted', this.email, this.password);
      localStorage.setItem('bearerToken', 'test');
    } else {
      console.log('Please fill in the credentials.');
    }
  }
  handleLogout() {
    localStorage.removeItem('bearerToken');
    // TO DO: Go back to homepage
  }
}
