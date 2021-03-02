class Email {

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get email_code(): string {
        return this._email_code;
    }

    set email_code(value: string) {
        this._email_code = value;
    }

    private _email: string;
    private _email_code: string;
}

export default Email;