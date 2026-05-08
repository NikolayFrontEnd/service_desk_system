import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { InitialRepairRequestsModule } from './initial-repair-requests/initial-repair-requests.module';
import { AssignedRepairTasksModule } from './assigned-repair-tasks/assigned-repair-tasks.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, TicketsModule, InitialRepairRequestsModule, AssignedRepairTasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
