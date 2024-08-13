import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurant.controller';
import { RestaurantsService } from './restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from './schemas/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
