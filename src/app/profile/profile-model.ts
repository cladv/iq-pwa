export class Profile {
    public name: String;
    public desc: String;
    public monitoring: number;
    public isActive: boolean;
    public createDT: Date;
    constructor() {
        this.clear();
      }
    clear(){
        this.name = '';
        this.desc = '';
        this.monitoring = 0;
        this.isActive = true;
        this.createDT = null;
    }
}