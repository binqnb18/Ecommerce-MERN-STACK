// Định nghĩa interface cho các tham số truy vấn, bao gồm page, limit và các tham số khác
interface QueryParams {
  page?: string;
  limit?: string;
  [key: string]: any;
}

// Định nghĩa interface cho kết quả phân trang, bao gồm error tùy chọn
interface PaginationResult {
  currentPage: number;
  limit: number;
  skip: number;
  totalPage: number;
  totalItems: number;
  error?: { status: number; message: string };
}     

/**
 * Hàm pagination tính toán các thông số phân trang cho danh sách dữ liệu.
 * @param query Query parameters từ request (page, limit).
 * @param totalItems Tổng số bản ghi từ database.
 * @param defaultLimit Số bản ghi mặc định mỗi trang (mặc định 10).
 * @param maxLimit Giới hạn tối đa cho limit (mặc định 100).
 * @returns PaginationResult chứa các thông số phân trang hoặc lỗi.
 */
export const pagination = (
  query: QueryParams,
  totalItems: number,
  defaultLimit: number = 10,
  maxLimit: number = 100
): PaginationResult => {
  // Chuyển page và limit thành số, dùng giá trị mặc định nếu không hợp lệ
  const page = parseInt(String(query.page)) || 1;
  const limit = parseInt(String(query.limit)) || defaultLimit;

  // Validation: Kiểm tra page và limit
  if (page < 1) {
    return {
      currentPage: 1,
      limit,
      skip: 0,
      totalPage: 0,
      totalItems,
      error: { status: 400, message: 'Số trang phải lớn hơn 0' },
    };
  }

  if (limit < 1) {
    return {
      currentPage: page,
      limit,
      skip: 0,
      totalPage: 0,
      totalItems,
      error: { status: 400, message: 'Số bản ghi mỗi trang phải lớn hơn 0' },
    };
  }

  if (limit > maxLimit) {
    return {
      currentPage: page,
      limit,
      skip: 0,
      totalPage: 0,
      totalItems,
      error: { status: 400, message: `Số bản ghi mỗi trang không được vượt quá ${maxLimit}` },
    };
  }

  // Tính số bản ghi bỏ qua (skip) và tổng số trang
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(totalItems / limit);

  // Trả về kết quả phân trang
  return {
    currentPage: page,
    limit,
    skip,
    totalPage,
    totalItems,
  };
};