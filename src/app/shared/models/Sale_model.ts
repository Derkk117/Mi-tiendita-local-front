//Se crea el modelo de ventas con todos los datos que se necesita
export class Sale {
    constructor(
        public products: string,
        public payment_method: string,
        public card_number: string,
        public card_cvc: string,
        public expiration_date: string
    ){}
}