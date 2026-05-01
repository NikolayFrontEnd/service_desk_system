import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TestingService } from './testing.service';
import { TestingController } from './testing.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TestingController],
  providers: [TestingService],
})
export class TestingModule {}
