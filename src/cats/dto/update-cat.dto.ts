import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

// Toma los elementos del create y los pone opcionales, y permite modificar solo lo necesario con patch
export class UpdateCatDto extends PartialType(CreateCatDto) {}
