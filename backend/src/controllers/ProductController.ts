import { Request, Response } from 'express';
import Product from '../models/Product';
import { buildQuery } from '../helpers/buildQuery';
import { pagination } from '../helpers/pagination';
import { handleSort } from '../helpers/sort';

interface QueryParams {
  status?: string;
  keyword?: string;
  page?: string;
  limit?: string;
  sortKey?: string;
  sortValue?: string;
  price_min?: string;
  price_max?: string;
  [key: string]: any;
}

export const getAllProducts = async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  try {
    const find = buildQuery(req.query);
    if(find.error) {
      return res.status(find.error.status).json({ 
        success: false,
        error: find.error.message,
      });
    }

  } catch (error) {
    console.error('Lỗi trong getAllProducts:', error);
    return res.status(500).json({ 
      sucess: false,
      error: (error as Error).message || 'Lỗi server nội bộ',
    });
  }
}