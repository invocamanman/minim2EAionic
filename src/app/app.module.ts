import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';

//per les imatges
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';
import {Camera} from "@ionic-native/camera";

import { MyApp } from './app.component';
//providers
import { UserServiceProvider } from '../providers/user-service/user-service';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../auth/auth.guard';
import { APIInterceptor } from '../interceptors/api.interceptor';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
//pages from "../pages/imageupload/imageupload";
import { HomePage }           from '../pages/home/home';




@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyD4btF6um1qmUt7IZDVsU8WlWI6-PMYZk0' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,  FileTransferObject, File, Camera,
    AuthGuard,
    AuthServiceProvider, {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    UserServiceProvider
  ]
})
export class AppModule {}
