export class Client{
    constructor(
        public sku: string,
        public name: string,
        public last_name: string,
        public email: string,
        public payment_method: string,
        public phone: string,
        public client_type: string,
        public password: string,
    ){}  
}