import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean; /**Etat de l'authentification de l'utilisateur**/

  constructor(private authService: AuthService) { }

  ngOnInit() {
    /**Pour l'affichage du menu de naviguation de manière contextuelle**/
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
