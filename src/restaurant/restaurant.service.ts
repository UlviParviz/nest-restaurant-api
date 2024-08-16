import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  //Get all restaurants => GET /restaurants
  async findAll(query: Query): Promise<Restaurant[]> {
    const resPerPage = 4;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const restaurants = await this.restaurantModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return restaurants;
  }

  //Create new restaurants => POST /restaurants
  async create(restaurant: Restaurant): Promise<Restaurant[]> {
    const res = await this.restaurantModel.create(restaurant);
    return [res];
  }

  //Get restaurant by ID => GET /restaurants/:id
  async findById(id: string): Promise<Restaurant[]> {
    const isValidId = mongoose.isValidObjectId(id);

    if(!isValidId){
      throw new BadRequestException('Invalid ID error. Please enter a valid ID')
    }

    const restaurant = await this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return [restaurant];
  }

  //Update restaurant by ID => PUT /restaurants/:id
  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant[]> {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  // Delete a restaurant by ID  =>  DELETE  /restaurants/:id
  async deleteById(id: string): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndDelete(id);
  }
}
