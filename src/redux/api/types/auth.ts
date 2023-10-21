export interface RefreshResponse {
    response: {
        accessToken: string,
        refreshToken: string,
        expiry: 0
    },
    messages: any[],
    code: 0 | 1 | 2
}

export const RefreshResponseCodeDecrypt = ['ОК','Токен не найден в БД','Время жизни токена истекло']

export interface RefreshPayload {
    refreshToken: string
}

export interface LoginResponse {
    response: {
        accessToken: string,
        refreshToken: string,
        expiry: number // timeStamp
    },
    messages: any[],
    code: 0 | 1 | 2 | 3
}

export const LoginResponseCodeDecrypt = ['ОК','почта пуста или email не почта','юзер не найден','пароль не совпадает']

export interface LoginPayload {
    email: string,
    password: string
}
