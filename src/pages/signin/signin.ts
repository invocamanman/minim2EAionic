import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'signin'
})
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [UserServiceProvider],
})
export class SigninPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserServiceProvider,
              public toastCtrl: ToastController, public events: Events) {

  }


  signIn(username: string, password: string) {

    this.userService.signIn$(username, password).subscribe(
      //this.http.post<Result>('http://localhost:3000/users/login', ({name: username.value, password: password.value})).subscribe(
      data => {
        console.log(data);
        if (data.result == '0') {
          let toast = this.toastCtrl.create({
            message: 'Ha fallado el login',
            duration: 3000
          });
          toast.present();
        } else
        {
          if(data.result == '3') {
            let toast = this.toastCtrl.create({
              message: 'Estas bloqueado, no peudes entrar',
              duration: 3000
            });
            toast.present();
          }
          else{
            let toast = this.toastCtrl.create({
              message: 'Bienvenido ' + username,
              duration: 3000
            });
            toast.present();;
            this.navCtrl.setRoot('mainpage');
          }
        }
      } );
  }


  goToRegister(){
    // go to the signin
    this.navCtrl.push('register');

  }
  goToMainpage(){
    //this.navCtrl.push('mainpage');
    this.navCtrl.setRoot('mainpage')
  }

}
