// Định nghĩa interface cho query parameters để tăng tính an toàn kiểu
interface QueryParams {
  keyword?: string;
  [key: string]: any;
}

// Định nghĩa interface cho kết quả tìm kiếm
interface SearchResult {
  keyword: string;
  regex?: RegExp | { $or: Array<{ [key: string]: RegExp }> };
}

/**
 * Tạo điều kiện tìm kiếm dựa trên từ khóa từ query parameters.
 * @param query Query parameters chứa keyword.
 * @param fields Các trường để tìm kiếm (mặc định ['title']).
 * @returns SearchResult chứa keyword và regex (hoặc điều kiện $or nếu tìm kiếm nhiều trường).
 */
export const search = (query: QueryParams, fields: string[] = ['title']): SearchResult => {
  const result: SearchResult = { keyword: '' };

  // Kiểm tra và xử lý từ khóa
  if (query.keyword && String(query.keyword).trim()) {
    result.keyword = String(query.keyword).trim();

    // Thoát ký tự đặc biệt để ngăn regex injection
    const escapedKeyword = result.keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    // Nếu chỉ tìm kiếm trên một trường, tạo regex đơn giản
    if (fields.length === 1) {
      result.regex = new RegExp(escapedKeyword, 'i');
    } else {
      // Nếu tìm kiếm trên nhiều trường, tạo điều kiện $or cho MongoDB
      result.regex = {
        $or: fields.map((field) => ({ [field]: new RegExp(escapedKeyword, 'i') })),
      };
    }
  }

  return result;
};