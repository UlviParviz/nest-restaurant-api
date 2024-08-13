import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Post()
  async createRestaurant(
    @Body()
    restaurant: CreateRestaurantDto,
  ): Promise<Restaurant[]> {
    return this.restaurantService.create(restaurant);
  }

  @Get(':id')
  async getRestaurant(
    @Param('id')
    id: string,
  ): Promise<Restaurant[]> {
    return this.restaurantService.findById(id);
  }
}
