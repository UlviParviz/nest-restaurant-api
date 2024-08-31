import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { MealSchema } from './schemas/meal.schema';
import { RestaurantsModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
    RestaurantsModule,
  ],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}