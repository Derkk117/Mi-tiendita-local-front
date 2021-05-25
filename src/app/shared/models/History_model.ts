import { Time } from "@angular/common";

export class History{
    constructor(
        public id: number,
        public id_user: number,
        public description: string,
        public date: Date,
        public time: Time,
    ){}
}