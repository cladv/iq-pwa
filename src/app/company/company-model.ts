export class Company {
    public rut: number;
    public name: string;
    public country: string;
    public logo: string;
    public isActive: boolean;
    public createDT: Date;
    constructor() {
        this.clear();
      }
    clear(){
        this.rut = 0;
        this.name = '';
        this.country = '';
        this.logo = '';
        this.isActive = true;
        this.createDT = null;
    }
}