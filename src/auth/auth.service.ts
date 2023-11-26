import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { loginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: loginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };
    return {
      user,
      backendToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '3m',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
      },
    };
  }
  // appelé dans la fonction de login pour retourner le mot de passe
  async validateUser(dto: loginDto) {
    const user = await this.userService.findByEmail(dto.username);

    if (user && (await compare(dto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid password');
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };
    return {
      backendToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '3m',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
      },
    };
  }
  async getUserFromAuthenticationToken(token: string) {
    this.logger.log(
      'Beginning the authentification with extracted bearer token',
    );
    const payload = this.jwtService.verify(token, {
      secret: process.env.jwtSecretKey,
    });
    console.log(payload);
    const username = payload.username;
    if (username) {
      this.logger.log('Succefully authorizing client conncetions');
      return this.userService.findByEmail(username);
    }
  }
}
