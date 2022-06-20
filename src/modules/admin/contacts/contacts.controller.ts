import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../../dispatchers/transform.interceptor';
import { AuthGuard } from '../../../guards/auth.guard';
import { PaginationInterface } from '../../../interfaces/pagination';
import { SuccessResponse } from '../../../interfaces/response';
import { ContactCreateRequestDto } from './dto/contact-create.request.dto';
import { ContactsListResponseDto } from './dto/contact-list-response.dto';
import { ContactListRequestDto } from './dto/contact-list.request.dto';
import { UpdateContactRequestDto } from './dto/contact-update.request.dto';
import { ContactsService } from './contacts.service';
import { Caller } from '../../../decorators/caller.decorator';
import { JwtTokenInterface } from '../../../interfaces/jwt.token.interface';

@Controller('v1/contacts')
@ApiTags('Contacts')
@UseInterceptors(TransformInterceptor)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'List Contacts' })
  @ApiResponse({ status: 200, description: 'Success', type: ContactsListResponseDto, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  @HttpCode(200)
  async list(
    @Caller() caller: JwtTokenInterface,
    @Query() requestDto: ContactListRequestDto,
  ): Promise<SuccessResponse<PaginationInterface<ContactsListResponseDto[]>>> {
    const data = await this.contactsService.list(caller, requestDto);
    return { data };
  }

  @ApiOperation({ summary: 'Create Contact' })
  @ApiResponse({ status: 200, description: 'Success', type: ContactsListResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  @HttpCode(200)
  async create(@Caller() caller: JwtTokenInterface, @Body() requestDto: ContactCreateRequestDto): Promise<SuccessResponse<ContactsListResponseDto>> {
    const data = await this.contactsService.create(caller, requestDto);
    return { data };
  }

  @ApiOperation({ summary: 'Update Contact' })
  @ApiResponse({ status: 200, description: 'Success', type: ContactsListResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put('/:id')
  @HttpCode(200)
  async update(
    @Caller() caller: JwtTokenInterface,
    @Param('id') id: string,
    @Body() requestDto: UpdateContactRequestDto,
  ): Promise<SuccessResponse<ContactsListResponseDto>> {
    const data = await this.contactsService.update(id, caller, requestDto);
    return { data };
  }

  @ApiOperation({ summary: 'Delete Contact' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string, @Caller() caller: JwtTokenInterface): Promise<SuccessResponse<[]>> {
    const data = await this.contactsService.delete(id, caller);
    return { data };
  }
}
