import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ItemsService } from "./items.service";
import { CreateItemDto } from "./create-item.dto";

@Controller("items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  findAll() {
    return this.itemsService.getAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.itemsService.getOne(id);
  }

  @Post()
  createOne(@Body() createItemDto: CreateItemDto) {
    if (
      !createItemDto.title ||
      !createItemDto.description ||
      !createItemDto.price
    ) {
      throw new HttpException(
        "Missing required fields",
        HttpStatus.BAD_REQUEST
      );
    }
    return this.itemsService.create(createItemDto);
  }

  @Delete(":id")
  deleteOne(@Param("id") id: number) {
    return this.itemsService.deleteOne(id);
  }

  @Patch(":id")
  updateOne(@Param("id") id: number, @Body() createItemDto: CreateItemDto) {
    return this.itemsService.updateOne(id, createItemDto);
  }
}
