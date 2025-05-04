export const slugify = (text: string): string => {
    // Chuyển thành chữ thường
    let slug = text.toLowerCase();
  
    // Thay thế ký tự có dấu thành không dấu
    slug = slug
      .replace(/á|à|ả|ã|ạ|â|ấ|ầ|ẩ|ẫ|ậ|ă|ắ|ằ|ẳ|ẵ|ặ/g, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
      .replace(/í|ì|ỉ|ĩ|ị/g, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
      .replace(/đ/g, 'd');
  
    // Thay thế khoảng trắng và ký tự đặc biệt thành dấu gạch nối
    slug = slug.replace(/[^a-z0-9]+/g, '-');
  
    // Loại bỏ dấu gạch nối ở đầu và cuối
    slug = slug.replace(/^-+|-+$/g, '');
  
    return slug;
  };
  
  // Hàm kiểm tra và tạo slug duy nhất
  export const generateUniqueSlug = async (
    model: any,
    baseSlug: string,
    counter: number = 0
  ): Promise<string> => {
    const slug = counter === 0 ? baseSlug : `${baseSlug}-${counter}`;
    const existing = await model.findOne({ slug });
  
    if (!existing) {
      return slug;
    }
  
    return generateUniqueSlug(model, baseSlug, counter + 1);
  };