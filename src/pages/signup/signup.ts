import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular'
import {LoginPage} from "../login/login";
import firebase from 'firebase';
import {FeedPage} from "../feed/feed";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name: string = '';
  email: string = '';
  password: string = '';
  loginpage = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  onSignup() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((data) => {
        let newUser: firebase.User = data.user;
        newUser.updateProfile({displayName: this.name, photoURL: ''})
          .then(() => console.log('Profile updates'))
          .catch(error => console.log(error));

        const alert = this.alertCtrl.create({
          title: 'Successfully signed up',
          message: `Welcome ${this.name} !`,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.navCtrl.setRoot(FeedPage);
              }
            }
          ]
        });
        alert.present();
      })
      .catch(error => {
        const alert = this.alertCtrl.create({
          title: `Error on signup`,
          message: `${error.message}`,
          buttons: ['Ok']
        });
        alert.present();
      });

  }


}
