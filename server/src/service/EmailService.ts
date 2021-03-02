interface EmailService {
    sendEmail(email: string): Promise<boolean>;

    emailValidate(email: string, code: string): Promise<number>;
}

export default EmailService;