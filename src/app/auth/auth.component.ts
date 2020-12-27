import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  faEnvelope = faEnvelope;
  faAsterisk = faAsterisk;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.login(email, password);
    authObs.subscribe(
      (resData) => {
        this.error = null;
        this.router.navigate(['/table']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        // console.log(errorMessage);
      }
    );
    form.reset();
  }
}
