import { Component } from '@angular/core'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { DataService } from './services/data.service'
import { AssignmentServicesService } from './tab2/assignment-services.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private data: DataService,
    private assignment: AssignmentServicesService
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('mobile')) {
        this.statusBar.styleLightContent()
        this.splashScreen.hide()
      }
          let body={
      name: "John",
      email: "nischaya.gq+01@gmail.com",
      contact:"+918286143280",
      password:"123"
    }
    this.assignment.createUser(body).toPromise<any>()
      .then(data=>{
        console.log(data);
        this.data.user=data.data;
      })
      .catch(err=>{
        console.log(err);
      });


      this.data.setup()
      .then(info => {
        console.log('Database setup complete')
      })
      .catch(error => console.log('Error setting up the Database: ', error))
    })
  }
}
