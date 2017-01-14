export class Exercise {

    id: number;
    name: string;
    picture: string;
    moreInfoUrl: string;
    equipment: string;
    muscle: string;


    constructor(exerciseInfo: any) {
        this.id = exerciseInfo.id;
        this.name = exerciseInfo.name;
        this.picture = exerciseInfo.picture;
        this.moreInfoUrl = exerciseInfo.moreInfoUrl;
        this.equipment = exerciseInfo.equipment;
        this.muscle = exerciseInfo.muscle;
    }

}