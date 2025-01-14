import { Reflector } from '@nestjs/core'
import { ExecutionContext } from '@nestjs/common'
import { RolesGuard } from './roles.guard'
import { ROLE } from 'src/auth/models/auth.interface'

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard
  let reflector: Reflector

  beforeEach(() => {
    reflector = new Reflector()
    rolesGuard = new RolesGuard(reflector)
  })

  it('should return true if no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined)

    const context = createMockExecutionContext({})

    expect(rolesGuard.canActivate(context)).toBe(true)
  })

  it('should return false if user roles are missing', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([ROLE.ADMIN])

    const context = createMockExecutionContext({
      user: { roles: [] },
      params: { orgId: '1' },
    })

    expect(rolesGuard.canActivate(context)).toBe(false)
  })

  it('should return true if user role matches the required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([ROLE.ADMIN])

    const context = createMockExecutionContext({
      user: {
        roles: [{ orgId: { id: 1 }, role: ROLE.ADMIN }],
      },
      params: { orgId: '1' },
    })

    expect(rolesGuard.canActivate(context)).toBe(true)
  })

  it('should return false if user role does not match the required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([ROLE.ADMIN])

    const context = createMockExecutionContext({
      user: {
        roles: [{ orgId: { id: 1 }, role: ROLE.USER }],
      },
      params: { orgId: '1' },
    })

    expect(rolesGuard.canActivate(context)).toBe(false)
  })
})

function createMockExecutionContext(mockRequest: any): ExecutionContext {
  return {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue(mockRequest),
    }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
  } as unknown as ExecutionContext
}
