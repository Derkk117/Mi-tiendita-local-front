//Se crea el modelo de producto con todos los datos que se necesita
export class Product {
    constructor(
        public name: string,
        public description: string,
        public price: string,
        public cost: string,
        public stock: string,
        public image: string,
        public category: string,
        //public slug: string
    ){}
}