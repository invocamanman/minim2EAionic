import { Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
//models
import {Activity} from "../../models/activity.model";
import {User} from "../../models/user.model";
import {ActivityRequest} from "../../models/activityRequest.model";

//providers
import {UserServiceProvider} from "../../providers/user-service/user-service";

import {ISubscription} from "rxjs/Subscription";
/**
 * Generated class for the MainpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'mainpage'
})
@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html',
  providers: [UserServiceProvider]

})
export class MainpagePage{
  userlist: User[];
  userdetalle: User;
  buscadoridvalue: string;
  options123: number;
  buscador:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserServiceProvider, formBuilder: FormBuilder,  public toastCtrl: ToastController) {

    this.userdetalle=new User('1','','','',true)
    this.buscadoridvalue = "";
  }

  Filtrar(buscador){
    console.log(buscador);
    if (this.options123==1)
    {
      this.Buscaralfabetico(buscador);
    }
    else if (this.options123==2)
    {
      this.Buscarnombre(buscador);
    }
    else if (this.options123==3)
    {
      this.Buscarsurname(buscador);
    }
    else if (this.options123==4)
    {
      this.Buscarrol(buscador);
    }
    else if (this.options123==5)
    {
      this.Buscastate(buscador);
    }
}
  PutIDintosearch(id){
    console.log(id);
    this.buscadoridvalue = id;
}
  Buscarnombre(name){
    console.log(name);
    this.userService.filtrarpornombre$(name).subscribe(
      data => {
        console.log(data);
        this.userlist = data;
      }
    );
  }
  Buscarsurname(surname){
    this.userService.filtrarporsurname$(surname).subscribe(
      data => {
        console.log(data);
        this.userlist = data;
      }
    );
  }
  Buscarrol(rol){
    this.userService.filtrarporrol$(rol).subscribe(
      data => {
        console.log(data);
        this.userlist = data;
      }
    );
  }
  Buscastate(state){
    if (state== 'true' || state == 'false')
    {
      this.userService.filtrarporstate(state).subscribe(
        data => {
          console.log(data);
          this.userlist = data;
        }
      );
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Debes poner "true", o "false',
        duration: 3000
      });
      toast.present();
    }

  }
  Buscaralfabetico(name){
    this.userService.nombrealfabetico$().subscribe(
      data => {
        console.log(data);
        this.userlist = data;
      }
    );
  }
  Buscarporid(id){
    this.userService.usuariodetalle$(id).subscribe(
      data => {
        console.log(data);
        this.userdetalle = data;
        this.userdetalle._id=id;
      }

    );

  }
  Modificar(name, surname, rol){
    if(name=="")
      name=this.userdetalle.name;
    if(surname=="")
      surname=this.userdetalle.surname;
    if(rol=="")
      rol=this.userdetalle.role;
    this.userService.Modify$(name,surname,rol,this.userdetalle._id).subscribe(
      data => {
        console.log(data);
        if ( data.result =='0'){
          let toast = this.toastCtrl.create({
            message: 'No se ha modificado! D:',
            duration: 3000
          });
          toast.present();
        }
        else
        {
          let toast = this.toastCtrl.create({
            message: 'Se ha modificado! la ID no existe!',
            duration: 3000
          });
          toast.present();
          this.Buscarporid(this.userdetalle._id);
        }

      }
    );
  }

  Bloquearporid(id) {
    this.userService.usuariodetalle$(id).subscribe(
      data => {
        let toast = this.toastCtrl.create({
          message: 'Has bloqueado al usuario!',
          duration: 3000
        });
        toast.present();
        console.log(data);

      }
    );
  }

}
