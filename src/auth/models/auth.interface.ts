export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
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
  userId: number
  orgId: number
  role: ROLE
}

export interface AuthUserWithRoles extends AuthUser {
  roles?: {
    orgId: number
    role: ROLE
  }[]
}
