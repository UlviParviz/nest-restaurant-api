import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';

const mockAuthService = {
  create: jest.fn(),
  findOne: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let model: Model<User>;

  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            JwtModule.register({
                secret: 'KNAKSDJAKSLDJALKSDJALKSD',
                signOptions: { expiresIn: '1d' },
            })
        ],
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
