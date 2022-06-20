import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: false,
        value: false,
      },
    });

    if (errors.length > 0) {
      const allErrorsObject = this.buildErrors(errors);
      throw new BadRequestException({ message: this.buildFirstErrorMessage(allErrorsObject), data: allErrorsObject });
    }
    return object;
  }

  /**
   * Retrive first error message
   * @param allErrorsObject
   * @returns
   */
  private buildFirstErrorMessage(allErrorsObject: { [key: string]: string }) {
    return allErrorsObject[Object.keys(allErrorsObject)[0]];
  }

  /**
   * Retrive All error messages
   * @param errors
   * @returns
   */
  private buildErrors(errors: ValidationError[]) {
    const result: { [key: string]: string } = {};
    errors.forEach(el => {
      const prop = el.property;
      if (el.constraints) {
        Object.entries(el.constraints).forEach(constraint => {
          result[prop + constraint[0]] = `${constraint[1]}`;
        });
      }
    });
    return result;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
