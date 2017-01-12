import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CustomProgramCreationPage } from '../custom-program-creation/custom-program-creation';
import { SelectTemplateProgramPage } from '../select-template-program/select-template-program';

@Component({
  selector: 'page-program-introduction',
  templateUrl: 'program-introduction.html'
})
export class ProgramIntroductionPage {

  constructor(public navController: NavController) {
  }

  onCustomCreateClicked() {
    this.navController.push(CustomProgramCreationPage);
  }

  onSelectTemplateClicked() {
    this.navController.push(SelectTemplateProgramPage);
  }
}
