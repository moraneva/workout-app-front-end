import { Injectable } from "@angular/core";
import { Exercise } from '../models/exercise';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExerciseService {

    private exercisesUrl = 'assets/data/exercises.json';

    data: Observable<Exercise[]>;

    constructor(private http: Http) {

    }

    getExercises(query = "", filter: Exercise[] = []): Observable<Exercise[]> {
        if (!this.data) {
            this.data = this.http.get(this.exercisesUrl).map((res: Response) => res.json()).catch(this.handleError).publishReplay(1).refCount();
        }

        return this.data.map((exercises) => {
            let queriedData = exercises.filter((exercise) => {
                return exercise.name.toLowerCase().includes(query.toLowerCase()) && filter.indexOf(exercise) == -1;
            })

            return queriedData;
        })
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}