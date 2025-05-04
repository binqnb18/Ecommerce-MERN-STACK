interface FilterStatusResult {
    find: any;
    error?: { status: number; message: string };
  }
  
  export const filterStatus = (query: any, find: any): FilterStatusResult => {
    const validStatuses = ['active', 'inactive'];
  
    if (query.status) {
      const status = query.status as string;
      if (!validStatuses.includes(status)) {
        return {
          find,
          error: {
            status: 400,
            message: 'Trạng thái không hợp lệ. Chỉ hỗ trợ: active, inactive',
          },
        };
      }
      find.status = status;
    }
  
    return { find };
  };