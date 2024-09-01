import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurant.service';
import { getModelToken } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { Model } from 'mongoose';
import { find } from 'rxjs';

const mockRestaurantService = {
  find: jest.fn(),
};

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
});
