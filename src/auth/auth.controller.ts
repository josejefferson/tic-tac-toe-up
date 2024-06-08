import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { User } from '../modules/users/user.entity'
import { AuthUser } from './auth-user.decorator'
import { Auth } from './auth.decorator'
import { AuthService } from './auth.service'
import { ChangePasswordDto } from './dto/change-password.dto'
import { SignInResponseDto } from './dto/sign-in-response.dto'
import { SignInDto } from './dto/sign-in.dto'

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: User })
  me(@AuthUser() authUser: User) {
    return authUser
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiUnauthorizedResponse()
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
    const { jwt, user } = await this.authService.signIn(signInDto.email, signInDto.password)
    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30 // 30 days
    response.cookie('authorization', jwt, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: COOKIE_MAX_AGE })
    return user
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('authorization')
  }

  @Post('change-password')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @AuthUser() authUser: User) {
    return this.authService.changePassword(authUser.id, changePasswordDto.oldPassword, changePasswordDto.newPassword)
  }
}
