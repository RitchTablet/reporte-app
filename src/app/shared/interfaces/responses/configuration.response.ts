interface Maildata {
    user:string;
    password:string;
}

export interface ConfigurationResponse {
    mailData: Maildata;
}