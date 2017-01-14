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
  day: string;
  exercises: Exercise[];
  queryText = "";

  constructor(public navParams: NavParams, public events: Events, private _exerciseService: ExerciseService) {

    this.workout = this.navParams.get('workout');
    this.day = this.navParams.get('day');
    this.exercises = [];
  }

  ngOnInit() {

  }

  filterItems() {
    if (this.queryText.length) {
      this._exerciseService.getExercises(this.queryText, this.workout).subscribe((exercises) => {
        this.exercises = exercises;
      }, (error) => {
        console.error(error);
      });
    }
    else {
      this.exercises = [];
    }
  }

  cancelSearch() {
    this.exercises = [];
  }

  onAddExercise(exercise) {
    this.workout.push(exercise);
    this.queryText = "";
  }

  ionViewDidLeave() {
    this.events.publish('workout:changed', this.workout);
  }
}
