//Se crea el modelo de entregas con todos los datos que se necesita
export class Delivery {
    constructor(
        public sale_id: string,
        public place: string,
        public status: string
    ){}
}