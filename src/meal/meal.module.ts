import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MealSchema } from './schemas/meal.schema';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantsModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
    RestaurantsModule,
  ],
  providers: [MealService],
  controllers: [MealController],
})
export class MealModule {}
