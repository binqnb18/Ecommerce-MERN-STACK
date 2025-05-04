import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';
import { pagination } from '../helpers/pagination';
import { search } from '../helpers/search';
import { filterStatus } from '../helpers/filterStatus';
import { handleSort } from '../helpers/sort';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Bước 1: Tạo điều kiện tìm kiếm cơ bản
    let find: any = {
      deleted: false,
    };
    console.log('Bước 1: Điều kiện tìm kiếm cơ bản:', find);

    // Bước 2: Lọc theo trạng thái
    const filterResult = filterStatus(req.query, find);
    if (filterResult.error) {
      console.log('Bước 2: Lỗi lọc trạng thái:', filterResult.error);
      return res.status(filterResult.error.status).json({
        success: false,
        message: filterResult.error.message,
      });
    }
    find = filterResult.find;
    console.log('Bước 2: Điều kiện tìm kiếm sau khi lọc trạng thái:', find);

    // Bước 3: Tìm kiếm theo tiêu đề
    const searchResult = search(req.query);
    if (searchResult.regex) {
      find.title = searchResult.regex;
    }
    console.log('Bước 3: Điều kiện tìm kiếm sau khi tìm kiếm tiêu đề:', find);
    console.log('Bước 3: Kết quả tìm kiếm:', searchResult);

    // Bước 4: Đếm tổng số sản phẩm
    const totalProducts = await Product.countDocuments(find);
    console.log('Bước 4: Tổng số sản phẩm:', totalProducts);

    // Bước 5: Tính toán phân trang
    const paginationResult = pagination(req.query, totalProducts);
    console.log('Bước 5: Kết quả phân trang:', paginationResult);

    // Bước 6: Xử lý sắp xếp
    const sortResult = handleSort(req.query);
    if (sortResult.error) {
      console.log('Bước 6: Lỗi xử lý sắp xếp:', sortResult.error);
      return res.status(sortResult.error.status).json({
        success: false,
        message: sortResult.error.message,
      });
    }
    const sort = sortResult.sort;
    console.log('Bước 6: Object sắp xếp:', sort);

    // Bước 7: Truy vấn danh sách sản phẩm
    const products: IProduct[] = await Product.find(find)
      .sort(sort)
      .limit(paginationResult.limit)
      .skip(paginationResult.skip);
    console.log('Bước 7: Danh sách sản phẩm:', products);

    // Bước 8: Trả về kết quả
    const response = {
      success: true,
      data: products,
      pagination: paginationResult,
    };
    console.log('Bước 8: Kết quả trả về:', response);
    res.status(200).json(response);
  } catch (error) {
    console.error('Lỗi trong getAllProducts:', error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Lỗi server nội bộ',
    });
  }
};