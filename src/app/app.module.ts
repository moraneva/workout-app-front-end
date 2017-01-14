import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

/** App Pages **/
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ProgramIntroductionPage } from '../pages/program-introduction/program-introduction';
import { CustomProgramCreationPage } from '../pages/custom-program-creation/custom-program-creation';
import { SelectTemplateProgramPage } from '../pages/select-template-program/select-template-program';
import { ListPage } from '../pages/list/list';
import { EditWorkoutPage } from '../pages/edit-workout/edit-workout';

import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ProgramIntroductionPage,
    CustomProgramCreationPage,
    SelectTemplateProgramPage,
    EditWorkoutPage
  ],/**/
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ProgramIntroductionPage,
    CustomProgramCreationPage,
    SelectTemplateProgramPage,
    EditWorkoutPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage
  ]
})
export class AppModule { }
