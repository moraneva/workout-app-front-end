import { Component, OnInit } from '@angular/core';
import { NavParams, Events } from 'ionic-angular';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exerciseService';
@Component({
  selector: 'page-edit-workout',
  templateUrl: 'edit-workout.html',
  providers: [ExerciseService]
})
export class EditWorkoutPage implements OnInit {

  workout;
  exercises: Exercise[];
  queryText = "";

  constructor(public navParams: NavParams, public events: Events, private _exerciseService: ExerciseService) {

    this.workout = this.navParams.get('workout');
    this.exercises = [];
  }

  ngOnInit() {

  }

  filterItems() {
    if (this.queryText.length) {
      this._exerciseService.getExercises(this.queryText).then(exercises => {
        this.exercises = exercises;
      });
    }
    else {
      this.exercises = [];
    }
  }

  cancelSearch() {
    this.exercises = [];
  }

  ionViewDidLeave() {
    this.events.publish('workout:changed', this.workout);
  }
}
