import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './items.entity';
import { CreateItemDto } from './create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  /**
   * Retrieves all items from the database.
   * @returns A promise that resolves to an array of items.
   */
  async getAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  /**
   * Retrieves a single item by its ID.
   * @param id - The ID of the item.
   * @returns A promise that resolves to the found item.
   */
  async getOne(id: number): Promise<Item> {
    return this.itemRepository.findOne({ where: { id } });
  }

  /**
   * Creates a new item.
   * @param createItemDto - The data for creating the item.
   * @returns A promise that resolves to the created item.
   */
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(newItem);
  }

  /**
   * Deletes an item by its ID.
   * @param id - The ID of the item to delete.
   * @returns A promise that resolves when the item is deleted.
   */
  async deleteOne(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }

  /**
   * Updates an item by its ID.
   * @param id - The ID of the item to update.
   * @param createItemDto - The updated data for the item.
   * @returns A promise that resolves to the updated item.
   */
  async updateOne(id: number, createItemDto: CreateItemDto): Promise<Item> {
    await this.itemRepository.update(id, createItemDto);
    return this.itemRepository.findOne({ where: { id } });
  }
}
