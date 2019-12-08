import {ChangeDetectionStrategy, Component} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(){
    /**Configuration firebase**/
    var firebaseConfig = {
      apiKey: "AIzaSyAMaYlPyHjyYadvB7Q7Lqx-Gxf66uiR6rg",
      authDomain: "todolist-a7191.firebaseapp.com",
      databaseURL: "https://todolist-a7191.firebaseio.com",
      projectId: "todolist-a7191",
      storageBucket: "todolist-a7191.appspot.com",
      messagingSenderId: "364186250710",
      appId: "1:364186250710:web:de9146a1772c5bf4a1c877"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
