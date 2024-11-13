import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/auth/models/auth.interface';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: AuthUser): Observable<AuthUser> {
        return this.authService.registerAccount(user)
    }
}
