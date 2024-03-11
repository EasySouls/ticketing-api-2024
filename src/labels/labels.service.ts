import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLabelDto): Promise<Label> {
    try {
      return await this.prisma.label.create({ data });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Label[]> {
    return await this.prisma.label.findMany();
  }

  async findOne(id: number): Promise<Label> {
    const label = await this.prisma.label.findUnique({ where: { id } });
    if (label === null) {
      throw new NotFoundException('Ticket not found');
    }

    return label;
  }

  async update(id: number, data: UpdateLabelDto): Promise<Label> {
    try {
      return await this.prisma.label.update({ data, where: { id } });
    } catch {
      throw new NotFoundException('Ticket not found');
    }
  }

  async remove(id: number): Promise<Label> {
    try {
      return await this.prisma.label.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Ticket not found');
    }
  }
}
