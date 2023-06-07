export type LoginData = {
    phoneNumber: string
    password: string
}
export type RegisterData = {
    phoneNumber: string
    password: string
    passwordAgain: string
}

export const defaultLoginData: LoginData = {
    phoneNumber: "+380",
    password: ""
}

export const defaultRegisterData: RegisterData = {
    phoneNumber: "+380",
    password: "",
    passwordAgain: ""
}

export type AuthenticationResponse = {
    token: string
}
