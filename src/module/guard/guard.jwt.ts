import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtGuardAuth extends PassportStrategy(Strategy) {
  constructor(private readonly configservice: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `process.env.SECRET_KEY`,
    });
  }
  async validate(payload: any): Promise<any> {
    return { id: payload.id };
  }
}
