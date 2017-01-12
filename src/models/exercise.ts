export class Exercise {

    name: string;
    picture: string;
    description: string;

    constructor(exerciseInfo: any) {
        this.name = exerciseInfo.name;
        this.picture = exerciseInfo.picture;
        this.description = exerciseInfo.description;
    }

}