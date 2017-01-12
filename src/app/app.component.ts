import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { ProgramIntroductionPage } from '../pages/program-introduction/program-introduction';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public storage: Storage
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Program Introduction', component: ProgramIntroductionPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {

      let programSelectedKey = "programSelected";

      this.storage.get(programSelectedKey).then((isFirstUse) => {
        //if(isFirstUse == null){ keep this out for now to test.
        //this.storage.set(programSelectedKey, true); actually set this when we select a program
        this.nav.setRoot(ProgramIntroductionPage);
        //Send user to first use page.
        // }
      });

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
