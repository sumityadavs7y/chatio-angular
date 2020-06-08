export class User {
    constructor(
        public email: string,
        public id: string,
        private _accessToken: string,
        private _refreshToken: string,
        private _tokenExpirationDate: Date
    ) { }

    get accessToken() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._accessToken;
    }
}