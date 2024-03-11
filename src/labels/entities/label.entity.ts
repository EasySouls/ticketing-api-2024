import { IsDate, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class Label {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsDate()
  createdAt: Date;
}
