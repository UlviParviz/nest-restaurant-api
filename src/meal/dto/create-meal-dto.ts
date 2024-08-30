import { User } from 'src/auth/schemas/user.schema';
import { Category } from '../schemas/meal.schema';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMealDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter a correct category'})
  readonly category: Category;

  @IsNotEmpty()
  @IsString()
  readonly restaurant: string;

  @IsNotEmpty({message: 'You must provide a user ID'})
  readonly user: User;
}
