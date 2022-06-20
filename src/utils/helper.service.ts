import { Injectable } from '@nestjs/common';
import { PaginationInterface } from '../interfaces/pagination';

interface PaginationOffset {
  limit: number;
  offset: number;
  pagenumber: number;
}
@Injectable()
export class Helper {
  /**
   * Create random string
   * @param {number} length
   * @param {string|null} type
   * @return {string}
   */
  public generateRandomString(length: number, type?: 'number'): string {
    let charSet = '';
    let randomString = '';
    if (type === 'number') {
      charSet = '123456789';
    } else {
      charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    }

    for (let i = 0; i < length; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  /**
   * Create pagination offset
   * @param {number} pageNumber
   * @param {number} recordPerPage
   * @return {PaginationOffset}
   */
  public getPaginateOffset(pageNumber: number, recordPerPage: number): PaginationOffset {
    const pagenumber = pageNumber ? Number(pageNumber) : 1;
    const limit = recordPerPage ? Number(recordPerPage) : 10;
    const offset = (pagenumber - 1) * limit;
    return { limit, offset, pagenumber };
  }

  /**
   * Create response with pagination key value
   * @param {number} totalRecord
   * @param {number} pageNumber
   * @param {number} recordPerPage
   * @param {T[]} data
   * @return {PaginationInterface<[]>}
   */
  public createPagination<T>(totalRecord: number, pageNumber: number, recordPerPage: number, data: T[]): PaginationInterface<T[]> {
    let remainingCount = totalRecord - ((pageNumber - 1) * recordPerPage + data.length);
    remainingCount = remainingCount >= 0 ? remainingCount : 0;
    const result: PaginationInterface<T[]> = {
      total: totalRecord,
      recordPerPage,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalRecord / recordPerPage),
      nextPage: remainingCount ? pageNumber + 1 : null,
      remainingCount,
      data,
    };

    return result;
  }
}
