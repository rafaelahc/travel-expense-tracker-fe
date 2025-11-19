//Representa a resposta que vem do firebase. Eseplha o retorno do firebase

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean
}