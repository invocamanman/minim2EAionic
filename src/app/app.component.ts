import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MainpagePage} from "../pages/mainpage/mainpage";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  username:String;
  rootPage:any = HomePage;

  foto:String='assets/imgs/logo.png';
  pages: Array<{title: string, component: any, icon: string}>;



  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.username = localStorage.getItem('username');

      events.subscribe('user:created', (username) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        this.username=username;
      });

      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [
        { title: 'Pagina Principal', component: MainpagePage, icon: 'home'},
        { title: 'Exit', component: HomePage, icon: 'exit' }

      ];
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}

