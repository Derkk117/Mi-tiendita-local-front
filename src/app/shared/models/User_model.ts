export class User{
    constructor(
        public id: number,
        public name: string,
        public last_name: string,
        public email: string,
        public image: string,
        public direccion: {
            id: number,
            street: string,
            street2: string,
            ext_number: string,
            int_number: string,
            neighborhood: string,
            state: string,
            country: string,
            zipcode: string
        }
    ){}
}