  // Định nghĩa interface cho query parameters để tăng tính an toàn kiểu
interface QueryParams {
sortKey?: string;
sortValue?: string;
[key: string]: any;
}

// Định nghĩa interface cho kết quả sắp xếp
interface SortResult {
sort: Record<string, 1 | -1>;
error?: { status: number; message: string };
}

/**
 * Xử lý yêu cầu sắp xếp từ query parameters, tạo điều kiện sắp xếp cho truy vấn database.
 * @param query Query parameters chứa sortKey và sortValue (có thể là chuỗi phân tách bởi dấu phẩy).
 * @param validSortKeys Các trường hợp lệ để sắp xếp (mặc định ['title', 'price', 'position', 'stock']).
 * @param validSortValues Các thứ tự hợp lệ (mặc định ['asc', 'desc']).
 * @param defaultSort Điều kiện sắp xếp mặc định (mặc định { position: -1 }).
 * @returns SortResult chứa điều kiện sắp xếp hoặc lỗi nếu tham số không hợp lệ.
 */
export const handleSort = (
query: QueryParams,
validSortKeys: string[] = ['title', 'price', 'position', 'stock'],
validSortValues: string[] = ['asc', 'desc'],
defaultSort: Record<string, 1 | -1> = { position: -1 }
): SortResult => {
let sort: Record<string, 1 | -1> = { ...defaultSort };

// Kiểm tra và xử lý sortKey, sortValue
if (query.sortKey && query.sortValue) {
    const sortKeys = String(query.sortKey).toLowerCase().split(',');
    const sortValues = String(query.sortValue).toLowerCase().split(',');

    // Validate: Đảm bảo số lượng sortKeys và sortValues khớp nhau
    if (sortKeys.length !== sortValues.length) {
    return {
        sort,
        error: {
        status: 400,
        message: 'Số lượng trường sắp xếp và thứ tự sắp xếp phải khớp nhau',
        },
    };
    }

    // Validate mỗi sortKey và sortValue
    for (let i = 0; i < sortKeys.length; i++) {
    const sortKey = sortKeys[i].trim();
    const sortValue = sortValues[i].trim();

    if (!validSortKeys.includes(sortKey)) {
        return {
        sort,
        error: {
            status: 400,
            message: `Trường sắp xếp không hợp lệ: ${sortKey}. Chỉ hỗ trợ: ${validSortKeys.join(', ')}`,
        },
        };
    }

    if (!validSortValues.includes(sortValue)) {
        return {
        sort,
        error: {
            status: 400,
            message: `Thứ tự sắp xếp không hợp lệ: ${sortValue}. Chỉ hỗ trợ: ${validSortValues.join(', ')}`,
        },
        };
    }
    }

    // Tạo điều kiện sắp xếp từ sortKeys và sortValues
    sort = sortKeys.reduce((acc, key, i) => {
    acc[key] = sortValues[i] === 'asc' ? 1 : -1;
    return acc;
    }, {} as Record<string, 1 | -1>);
}

return { sort };
};