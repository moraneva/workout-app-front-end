import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { EditWorkoutPage } from '../edit-workout/edit-workout';

@Component({
  selector: 'page-custom-program-creation',
  templateUrl: 'custom-program-creation.html'
})
export class CustomProgramCreationPage {

  workoutDays = [{ day: 'Monday', active: true, workout: [] },
  { day: 'Tuesday', active: false, workout: [] },
  { day: 'Wednesday', active: true, workout: [] },
  { day: 'Thursday', active: false, workout: [] },
  { day: 'Friday', active: true, workout: [] },
  { day: 'Saturday', active: false, workout: [] },
  { day: 'Sunday', active: false, workout: [] }];

  constructor(public navController: NavController, public events: Events) {
  }

  onEditWorkoutClicked(workoutDay) {

    // Subscribe to event so we can get data back when we exit workout edit view
    this.events.subscribe('workout:changed', (workout) => {
      workoutDay.workout = workout;
    });

    this.navController.push(EditWorkoutPage, workoutDay);
  }

}
