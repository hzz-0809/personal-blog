class User {
    private _email: string;
    private _username: string;
    private _password: string;
    private _gender: number;
    private _birthday: string;
    private _alias: string;
    private _slogan: string;
    private _account_create_time: number;
    private _avatar: string;

    get avatar(): string {
        return this._avatar;
    }

    set avatar(value: string) {
        this._avatar = value;
    }

    get account_create_time(): number {
        return this._account_create_time;
    }

    set account_create_time(value: number) {
        this._account_create_time = value;
    }

    get gender(): number {
        return this._gender;
    }

    set gender(value: number) {
        this._gender = value;
    }

    get birthday(): string {
        return this._birthday;
    }

    set birthday(value: string) {
        this._birthday = value;
    }

    get alias(): string {
        return this._alias;
    }

    set alias(value: string) {
        this._alias = value;
    }

    get slogan(): string {
        return this._slogan;
    }

    set slogan(value: string) {
        this._slogan = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

}

export default User;