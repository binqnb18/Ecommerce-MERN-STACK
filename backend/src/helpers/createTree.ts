interface Category {
    id: string;
    parent_id: string;
    [key: string]: any; // Cho phép các thuộc tính khác từ MongoDB
  }
  
  interface TreeNode extends Category {
    index: number;
    children?: TreeNode[];
  }
  
  let count = 0;
  
  const createTree = (arr: Category[], parentId: string = ""): TreeNode[] => {
    const tree: TreeNode[] = [];
    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        count++;
        const newItem: TreeNode = { ...item, index: count };
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
  };
  
  export const tree = (arr: Category[], parentId: string = ""): TreeNode[] => {
    count = 0;
    return createTree(arr, parentId);
  };