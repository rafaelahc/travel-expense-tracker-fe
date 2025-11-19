//Aqui eu crio um novo user com os dados que eu recebi do firebase que foi colocado no authResponseData
//Ou seja, aqui tem logica e não é só um objeto de dados.

export class User {
    constructor(
        public id: string, //LocalId
        public email: string,
        private _token: string, //IdToken
        private _tokenExpirationDate: Date, //Eu que vou definir no service o que vai receber
        public displayName?: string,

    ) { }

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return;
        }
        return this._token;
    }

}