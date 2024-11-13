export enum ROLE {
    USER = 'user',
    ADMIN = 'admin'
}

export interface AuthUser {
    id: number
    email: string
    password: string
}

export interface AuthOrg {
    id: number
    name: string
}

export interface AuthOrgRole {
    user_id: number
    org_id: number
    role: ROLE
}