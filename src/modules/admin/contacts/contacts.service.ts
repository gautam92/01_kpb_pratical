import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Op, WhereOptions } from 'sequelize';
import { Contacts } from '../../../entities/contacts.entity';
import { JwtTokenInterface } from '../../../interfaces/jwt.token.interface';
import { PaginationInterface } from '../../../interfaces/pagination';
import { Helper } from '../../../utils/helper.service';
import { ContactCreateRequestDto } from './dto/contact-create.request.dto';
import { ContactsListResponseDto } from './dto/contact-list-response.dto';
import { ContactListRequestDto } from './dto/contact-list.request.dto';
import { UpdateContactRequestDto } from './dto/contact-update.request.dto';

@Injectable()
export class ContactsService {
  constructor(@Inject('CONTACTS_REPOSITORY') private readonly CONTACTS_REPOSITORY: typeof Contacts, private readonly helper: Helper) {}

  /**
   * List contacts
   * @returns ContactsListResponseDto[]
   */
  async list(caller: JwtTokenInterface, requestDto: ContactListRequestDto): Promise<PaginationInterface<ContactsListResponseDto[]>> {
    const { limit, offset, pagenumber } = this.helper.getPaginateOffset(requestDto.currentPage, requestDto.recordPerPage);

    const where: WhereOptions[] = [{ user_id: caller.id }];
    if (requestDto.search) {
      where.push({
        [Op.or]: [{ title: { [Op.iLike]: `%${requestDto.search}%` } }],
      });
    }

    const contacts = await this.CONTACTS_REPOSITORY.findAndCountAll({ where: { [Op.and]: where }, limit, offset });

    const finaldata = contacts.rows.map(e => new ContactsListResponseDto(e));

    return this.helper.createPagination(contacts.count, pagenumber, limit, finaldata);
  }

  /**
   * Create contact
   * @param requestDto
   * @returns
   */
  async create(caller: JwtTokenInterface, requestDto: ContactCreateRequestDto): Promise<ContactsListResponseDto> {
    const contact = this.CONTACTS_REPOSITORY.build();

    contact.username = requestDto.username;
    contact.email = requestDto.email;
    contact.phone_no = requestDto.phone_no;
    contact.user_id = caller.id;

    await contact.save();

    return new ContactsListResponseDto(contact);
  }

  /**
   * Update contact
   * @param requestDto
   * @returns
   */
  async update(id: string, caller: JwtTokenInterface, requestDto: UpdateContactRequestDto): Promise<ContactsListResponseDto> {
    const contact = await this.CONTACTS_REPOSITORY.findOne({ where: { id, user_id: caller.id } });
    if (!contact) {
      throw new BadRequestException(`Contact not found`);
    }

    contact.username = requestDto.username || contact.username;
    contact.email = requestDto.email || contact.email;
    contact.phone_no = requestDto.phone_no || contact.phone_no;

    await contact.save();

    return new ContactsListResponseDto(contact);
  }

  /**
   * Delete contact
   * @param id
   * @returns
   */
  async delete(id: string, caller: JwtTokenInterface): Promise<[]> {
    await this.CONTACTS_REPOSITORY.destroy({ where: { id, user_id: caller.id } });

    return [];
  }
}
