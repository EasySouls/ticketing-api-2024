import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
    try {
      return await this.prisma.ticket.create({ data });
    } catch {
      throw new BadRequestException('Invalid ticketId');
    }
  }

  async findAll(): Promise<Ticket[]> {
    return await this.prisma.ticket.findMany({ include: { labels: true } });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: { labels: true },
    });
    if (ticket === null) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  async update(
    id: number,
    data: Prisma.TicketUncheckedUpdateInput,
  ): Promise<Ticket> {
    try {
      return await this.prisma.ticket.update({ data, where: { id } });
    } catch {
      throw new NotFoundException('Ticket not found');
    }
  }

  async remove(id: number): Promise<Ticket> {
    try {
      return await this.prisma.ticket.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Ticket not found');
    }
  }

  async addLabel(ticketId: number, labelId: number) {
    try {
      return await this.prisma.ticket.update({
        where: { id: ticketId },
        data: { labels: { connect: { id: labelId } } },
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async removeLabel(ticketId: number, labelId: number) {
    try {
      return await this.prisma.ticket.update({
        where: { id: ticketId },
        data: { labels: { disconnect: { id: labelId } } },
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
