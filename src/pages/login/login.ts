import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import firebase from 'firebase';
import {FeedPage} from "../feed/feed";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = '';
  password: string = '';
  signuppage = SignupPage;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {
  }

  onLogin() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((data)=> {
        const toast =  this.toastCtrl.create({
          message: `Successfully signed in! Welcome ${data.user.displayName} `,
          duration: 2500
        });
        toast.present();
        this.navCtrl.setRoot(FeedPage);
      })
      .catch((error)=>{
        const toast =  this.toastCtrl.create({
          message: `Error login: ${error.message}`,
          duration: 2500

        });
        toast.present();
      })
  }
}
