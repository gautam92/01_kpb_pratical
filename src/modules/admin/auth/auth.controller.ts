import { Body, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../../dispatchers/transform.interceptor';
import { SuccessResponse } from '../../../interfaces/response';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.request.dto';

@Controller('v1/auth')
@ApiTags('Authentications')
@UseInterceptors(TransformInterceptor)
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login into the system' })
  @ApiResponse({ status: 200, description: 'Success', type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid email or password' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('/login')
  @HttpCode(200)
  async userLogin(@Body() requestDto: LoginRequestDto): Promise<SuccessResponse<LoginResponseDto>> {
    const data = await this.authService.login(requestDto);
    return { data };
  }

  @ApiOperation({ summary: 'Register into the system' })
  @ApiResponse({ status: 200, description: 'Success', type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid email or password' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('/register')
  @HttpCode(200)
  async userRegister(@Body() requestDto: RegisterRequestDto): Promise<SuccessResponse<[]>> {
    const data = await this.authService.register(requestDto);
    return { message: 'User has been registered successfully', data };
  }
}
