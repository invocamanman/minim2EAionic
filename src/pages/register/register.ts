import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {User} from '../../models/user.model';
import {result} from '../../models/result.model';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UserServiceProvider],
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider,public toastCtrl: ToastController) {
  }

  goToSignin(){
    // go to the signin
    this.navCtrl.push('signin');
  }

  signUp(name:string, surname:string, role:string, password: string, password2: string ){

    if (password != password2) {
      let toast = this.toastCtrl.create({
        message: 'las contrasñas no coinciden',
        duration: 3000
      });
      toast.present();
      //this.showErrorToast("Passwords doesn't match");
    }
    else {
      this.userService.Register$(name,password,surname,role).subscribe(
        data => {
          console.log(data.name);//hacer que no envie passwword
          let toast = this.toastCtrl.create({
            message: 'Te has registrado correctamente '+ data.name,
            duration: 3000
          });
          toast.present();
          this.navCtrl.setRoot('mainpage');
        }

      );
    }

  }

}
