const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidEmail(email: string) {
    return emailRegex.test(email);
}

export function isValidPassword(password: string) {
    return password.length >= 6 && password.length <= 32;
}

export function isValidUsername(username: string) {
    return username.length >= 4 && username.length <= 32;
}