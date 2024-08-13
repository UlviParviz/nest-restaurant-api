import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  //Get all restaurants => GET /restaurants
  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel.find();
    return restaurants;
  }

  //Create new restaurants => POST /restaurants
  async create(restaurant: Restaurant): Promise<Restaurant[]> {
    const res = await this.restaurantModel.create(restaurant);
    return [res];
  }

  //Get restaurant by ID => GET /restaurants/:id
  async findById(id: string): Promise<Restaurant[]> {
    const restaurant = await this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return [restaurant];
  }
}
