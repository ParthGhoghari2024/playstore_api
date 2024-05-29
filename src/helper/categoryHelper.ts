import CategoryModel from "../models/categoryModel";
import { IId } from "../types/interface";
import { logger } from "../utils/pino";

const getCategoryIdByName = async (
  category: string
): Promise<number | null> => {
  try {
    const categoryRes: CategoryModel | null = await CategoryModel.findOne({
      attributes: ["id"],
      raw: true,
      where: {
        category: category,
      },
    });

    if (categoryRes && categoryRes.id) {
      return categoryRes.id;
    }
    return null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export { getCategoryIdByName };
