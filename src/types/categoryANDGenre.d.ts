export interface ICategory {
  id?: number;
  category: string;
}
export interface IGenre {
  id?: number;
  genre: string;
  categoryId: number;
}
