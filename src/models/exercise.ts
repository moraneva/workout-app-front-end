export class Exercise {

    id: number;
    name: string;
    picture: string;
    description: string;


    constructor(exerciseInfo: any) {
        this.id = exerciseInfo.id;
        this.name = exerciseInfo.name;
        this.picture = exerciseInfo.picture;
        this.description = exerciseInfo.description;
    }

}