import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Label, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.LabelCreateInput): Promise<Label> {
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

  async update(id: number, data: Prisma.LabelUpdateInput): Promise<Label> {
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
