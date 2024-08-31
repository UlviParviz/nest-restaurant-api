import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { MealService } from './meal.service';
import { Meal } from './schemas/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';

@Controller('meals')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get()
  async getAllMeals(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Get('restaurant/:id')
  async getMealsByRestaurant(
    @Param('id') restaurantId: string,
  ): Promise<Meal[]> {
    return this.mealService.findByRestaurant(restaurantId);
  }

  @Post()
  @UseGuards(AuthGuard())
  createMeal(
    @Body() createMealDto: CreateMealDto,
    @CurrentUser() user: User,
  ): Promise<Meal> {
    return this.mealService.create(createMealDto, user);
  }
}
