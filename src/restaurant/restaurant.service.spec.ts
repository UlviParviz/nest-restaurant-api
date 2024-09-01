import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import APIFeatures from '../utils/features.utils';
import { UserRoles } from '../auth/schemas/user.schema';
import { RestaurantsService } from './restaurant.service';
import { Restaurant } from './schemas/restaurant.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockRestaurant = {
  user: '61c0ccf11d7bf83d153d7c06',
  menu: [],
  location: {
    type: 'Point',
    coordinates: [-77.376204, 38.492151],
    formattedAddress: '200 Olympic Dr, Stafford, VA 22554-7763, US',
    city: 'Stafford',
    state: 'VA',
    zipcode: '22554-7763',
    country: 'US',
  },
  images: [],
  category: 'Fast Food',
  address: '200 Olympic Dr, Stafford, VS, 22554',
  phoneNo: 9788246116,
  email: 'ghulam@gamil.com',
  description: 'This is just a description',
  name: 'Retaurant 4',
  _id: '61c4aa2ffaa767823d1687ef',
  createdAt: '2021-12-23T16:56:15.127Z',
  updatedAt: '2021-12-23T16:56:15.127Z',
};

const mockUser = {
  _id: '61c0ccf11d7bf83d153d7c06',
  email: 'ghulam1@gmail.com',
  name: 'Ghulam',
  role: UserRoles.USER,
};

const mockRestaurantService = {
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('RestaurantService', () => {
  let service: RestaurantsService;
  let model: Model<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: getModelToken(Restaurant.name),
          useValue: mockRestaurantService,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    model = module.get<Model<Restaurant>>(getModelToken(Restaurant.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all restaurants', async () => {
      jest.spyOn(model, 'find').mockImplementationOnce(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockRestaurant]),
            }),
          }) as any,
      );

      const restaurants = await service.findAll({ keyword: 'restaurant' });
      expect(restaurants).toEqual([mockRestaurant]);
    });
  });

  describe('create', () => {
    const newRestaurant = {
      category: 'Fast Food',
      address: '200 Olympic Dr, Stafford, VS, 22554',
      phoneNo: 9788246116,
      email: 'ghulam@gamil.com',
      description: 'This is just a description',
      name: 'Retaurant 4',
    };

    it('should create a new restaurant', async () => {
      jest
        .spyOn(APIFeatures, 'getRestaurantLocation')
        .mockImplementationOnce(() => Promise.resolve(mockRestaurant.location));

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockRestaurant as any));

      const result = await service.create(
        newRestaurant as any,
        mockUser as any,
      );
      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('findById', () => {
    it('should get restaurant by Id', async () => {
      jest
        .spyOn(model, 'findById')
        .mockResolvedValueOnce(mockRestaurant as any);

      const result = await service.findById(mockRestaurant._id);
      expect(result).toEqual(mockRestaurant);
    });

    it('should throw wrong moongose id error', async () => {
      await expect(service.findById('wrongid')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw restaruant not found error', async () => {
      const mockError = new NotFoundException('Restaurant not found.');
      jest.spyOn(model, 'findById').mockRejectedValue(mockError);

      await expect(service.findById(mockRestaurant._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateById', () => {
    it('should update the restaurant', async () => {
      const restaurant = { ...mockRestaurant, name: 'Updated name' };
      const updateRestaurant = { name: 'Updated name' };

      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockResolvedValueOnce(restaurant as any);

      const updatedRestaurant = await service.updateById(
        restaurant._id,
        updateRestaurant as any,
      );
      expect(updatedRestaurant.name).toEqual(updateRestaurant.name);
    });
  });

  describe('deleteById', () => {
    it('should delete the restaurant', async () => {
      const deleteMessage = { deleted: true };
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValueOnce(deleteMessage as any);

      const result = await service.deleteById(mockRestaurant._id);

      expect(result).toEqual(deleteMessage);
    });
  });
});
