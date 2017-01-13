import { Component } from '@angular/core';
import { NavController, Events, AlertController } from 'ionic-angular';
import { EditWorkoutPage } from '../edit-workout/edit-workout';

@Component({
  selector: 'page-custom-program-creation',
  templateUrl: 'custom-program-creation.html'
})
export class CustomProgramCreationPage {

  workoutDays: WorkoutDay[];

  workoutFormat: string[];

  readonly nonActiveIdentifier = 'x';

  constructor(public navController: NavController, public events: Events, public alertController: AlertController) {

    this.workoutDays = [{ day: 'Day 1', active: true, workout: [] },
    { day: 'Day 2', active: false, workout: [] },
    { day: 'Day 3', active: true, workout: [] },
    { day: 'Day 4', active: false, workout: [] },
    { day: 'Day 5', active: true, workout: [] },
    { day: 'Day 6', active: false, workout: [] },
    { day: 'Day 7', active: false, workout: [] }];

    this.workoutFormat = ['x', 'x', 'A', 'x', 'B', 'x', 'x'];
  }

  onEditWorkoutClicked(workoutDay, index) {

    // Subscribe to event so we can get data back when we exit workout edit view
    this.events.subscribe('workout:changed', (workout) => {
      let day = this.workoutFormat[index];

      let sameWorkoutIndicies = [];
      this.workoutFormat.forEach((value, idx) => {
        if (value == day) {
          sameWorkoutIndicies.push(idx);
        }
      });


      sameWorkoutIndicies.forEach((idx) => {
        this.workoutDays[idx].workout = workout;
      });

      this.events.unsubscribe('workout:changed');
    });

    this.navController.push(EditWorkoutPage, workoutDay);
  }

  onDayToggled(event, index) {
    if (event.checked == true && this.workoutFormat[index] == this.nonActiveIdentifier) {
      this.workoutFormat[index] = 'A';
      this.workoutDays[index].active = true;
      this.setWorkoutEqualToSameDay(this.workoutFormat[index], index);
    }
    else if (event.checked == false && this.workoutFormat[index] != this.nonActiveIdentifier) {
      this.clearWorkout(index);
    }
    else if (event.checked == true && this.workoutFormat[index] != this.nonActiveIdentifier) {
      if (this.workoutFormat[index] == 'F') {
        this.clearWorkout(index);
      }
      else {
        this.workoutFormat[index] = String.fromCharCode(this.workoutFormat[index].charCodeAt(0) + 1);
        this.setWorkoutEqualToSameDay(this.workoutFormat[index], index);
      }
    }
  }

  onWorkoutFormatButtonClicked(index) {
    this.onDayToggled({ checked: true }, index);
  }

  onWhatsThisClicked() {
    let alert = this.alertController.create({
      title: 'Split Routines',
      subTitle: 'Split routines allow you to do workouts multiple times per week.' +
      ' An example of an effective split workout routine would be ABxABxx where' +
      ' workouts on A days are the same and workouts on B days are the same. x marks rest days.',
      buttons: ['OK']
    });

    alert.present();
  }

  setWorkoutEqualToSameDay(identifier, index) {

    let matchingIndex = -1;

    this.workoutFormat.forEach((value, idx) => {
      if (idx === index)
        return;

      if (value === identifier) {
        matchingIndex = idx;
      }
    });

    if (matchingIndex === -1)
      return;

    this.workoutDays[index].workout = this.workoutDays[matchingIndex].workout;
  }

  clearWorkout(index) {
    this.workoutFormat[index] = this.nonActiveIdentifier;
    this.workoutDays[index].workout = [];
  }

  discardChanges() {
    let alert = this.alertController.create({
      title: 'Continue?',
      subTitle: 'Are you sure you want to discard your changes?',
      buttons: [{
        text: 'No',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: data => {
          this.navController.pop();
        }
      }]
    });

    alert.present();
  }

}

class WorkoutDay {
  day: string;
  active: boolean;
  workout: any[];
}
