import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy) { 
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.access_token,
            ]),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}