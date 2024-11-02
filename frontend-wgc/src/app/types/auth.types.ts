export interface AuthCredentials{
    login: string;
    password: string
}

export interface LoginResponse {
    isFine: boolean,
    user: string | null
}

export interface AuthStoreData { 
    isUserLoggedIn: boolean,
    loggedUser: string | null
}