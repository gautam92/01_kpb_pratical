import { BadRequestException } from '@nestjs/common';
import { registerDecorator } from 'class-validator';

/**
 * For validating date-time difference
 * difference between given two date-time(timestamps) must be 4-12 hours
 * @param property to compare current value with this property's value
 * @param validationOptions
 */
export const IsLessThanNow = () => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsLessThanNow',
      target: object.constructor,
      propertyName,
      constraints: [],
      validator: {
        validate(value: Date) {
          if (!value) {
            throw new BadRequestException('Datum erforderlich');
          }

          const currentDate = new Date().getTime();
          const newValueMilliseconds = new Date(value).getTime();

          if (newValueMilliseconds <= currentDate) {
            throw new BadRequestException('Das Ereignis sollte ein zukünftiges Datum und eine zukünftige Uhrzeit sein');
          }

          return true;
        },
      },
    });
  };
};
