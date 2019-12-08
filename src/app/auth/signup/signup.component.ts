import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], /**Pour respecter le format d'adresse email**/
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]] /**au moins 6 caractères alphanumériques**/
    });
  }

  /**On fait appel au service d'authentification pour enregistrer l'utilisateur dans le firebase**/
  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/todolist']); /**Si la création fonctionne, on redirige le user vers todolist **/
      },
      (error) => {
        this.errorMessage = error;
        alert(this.errorMessage); /**Si la création ne marche pas, on affiche un message d'erreur**/
      }
    );
  }

}
