    

export class Person{
    constructor(
        public lasname: string,
        public firstname: string,
        public identity_document: string,
        public email: string,
        public address:string,
        public postalcode: string,
        public state: string,
        public birthday: string,
        public locality?: string,
        public id?: string
    ) {

    }
}