import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AuthOrgRoleEntity, AuthUserEntity } from 'src/auth/models/auth.entity'
import { MockRepository } from 'src/utils/varios.mocks'
import { JwtService } from '@nestjs/jwt'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(AuthUserEntity),
          useValue: MockRepository,
        },
        {
          provide: getRepositoryToken(AuthOrgRoleEntity),
          useValue: MockRepository,
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
