import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**Les méthodes de création, de connexion et de déconnexion suivantes sont asynchrones
   * Donc on retourne des Promise pour pouvoir gérer les situations d'erreur
   */

  /**Pour créer un nouvel utilisateur**/
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**Pour connecter l'utilisateur**/
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**Pour déconnecter l'utiisateur**/
  signOutUser() {
    firebase.auth().signOut();
  }

}
