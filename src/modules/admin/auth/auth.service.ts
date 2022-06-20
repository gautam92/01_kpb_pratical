import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Users } from '../../../entities/users.entity';
import { UserSessions } from '../../../entities/users.sessions.entity';
import { JwtTokenInterface } from '../../../interfaces/jwt.token.interface';
import { JwtHelper } from '../../../utils/jwt.helper';
import { PasswordHelper } from '../../../utils/password.helper';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { RegisterRequestDto } from './dto/register.request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly USERS_REPOSITORY: typeof Users,
    @Inject('USER_SESSIONS_REPOSITORY') private readonly USER_SESSIONS_REPOSITORY: typeof UserSessions,
    private readonly password: PasswordHelper,
    private readonly jwtToken: JwtHelper,
  ) {}

  /**
   * User login with email and password
   * @param loginDto LoginRequestDto
   * @returns LoginResponseDto
   */
  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const email = loginDto.email.toLocaleLowerCase();

    console.log(email);

    const user = await this.USERS_REPOSITORY.findOne({ where: { email } });

    console.log(user);

    if (!user) {
      console.log('locha');
      throw new BadRequestException('Invalid credentials');
    }

    try {
      await this.password.compare(loginDto.password, user.password_hash);
    } catch (e) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokenDto: JwtTokenInterface = {
      id: user.id,
      email: user.email,
    };
    const jwtToken = await this.jwtToken.generateToken(tokenDto);

    await this.USER_SESSIONS_REPOSITORY.create({ user_id: user.id, jwttoken: jwtToken });

    return new LoginResponseDto(user, jwtToken);
  }

  /**
   * User registration
   * @param requestDto RegisterRequestDto
   * @returns LoginResponseDto
   */
  async register(requestDto: RegisterRequestDto): Promise<[]> {
    const email = requestDto.email.toLocaleLowerCase();

    const user = await this.USERS_REPOSITORY.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException('Already registered');
    }

    const newUser = this.USERS_REPOSITORY.build();

    newUser.username = requestDto.username;
    newUser.email = email;
    newUser.password_hash = (await this.password.generateSaltAndHash(requestDto.password)).passwordHash;

    await newUser.save();

    return [];
  }
}
