export interface LoginDetails {
    validUser: User;
    InvalidUser: User;
}

export interface User {
    username: string;
    password: string;
}
