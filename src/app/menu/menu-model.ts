// export interface Menu {
//     name: string;
//     desc: number;
//     id?: string;
// }
export class Menu {
    constructor(
        public name: string,
        public desc: string,
        public router: string,
    ){}
}