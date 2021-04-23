export class User{
    constructor(
        public id: number,
        public name: string,
        public last_name: string,
        public email: string,
        public image: string,
        public store_id: number,
        public address_id: number
    ){}
}