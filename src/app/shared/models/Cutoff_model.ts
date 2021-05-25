//Se crea el modelo de cortes de ventas con todos los datos que se necesita
export class Cutoff {
    constructor(
        public sku: string,
        public user_id: string,
        public initial_date: string,
        public final_date: string,
        public total: string
    ){}
}