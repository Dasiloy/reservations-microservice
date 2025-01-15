import { DateComparison } from '@app/common/global/validators/date-comparism.validator';
import { DateValidator } from '@app/common/global/validators/date.validator';

export class CreateReservationDto {
  @DateValidator(true, { message: 'Start date is required' })
  startDate: Date;

  @DateComparison(
    { required: true, comparisonKey: 'startDate', comparisonType: 'greater' },
    { message: 'End date must be after start date' },
  )
  endDate: Date;
}
