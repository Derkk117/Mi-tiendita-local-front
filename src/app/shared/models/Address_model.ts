export class Address{
    constructor(
        public id: number,
        public street: string,
        public street2: string,
        public ext_number: string,
        public int_number: string,
        public neighborhood: string,
        public state: string,
        public country: string,
        public zip_code: string  
    ){}  
}