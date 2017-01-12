import { Injectable } from "@angular/core";
import { Exercise } from '../models/exercise';
import { EXERCISES } from '../mocks/exercises';

@Injectable()
export class ExerciseService {

    data: Exercise[];

    getExercises(query = "") {
        if (!this.data) {
            this.data = EXERCISES;
        }

        let queriedData = this.data.filter((exercise)=>{
            return exercise.name.toLowerCase().includes(query.toLowerCase());
        });
        return Promise.resolve(queriedData); // takes values from country.contacts typescript file
    }
}