import { Express } from 'express';
import { SYSTEM_CONFIG } from '../../config/system';
import { authMiddleware } from '../../middlewares/authMiddleware';
import productRoutes from './ProductRoutes';
import productCategoryRoutes from './ProductCategoryRoutes';
import roleRoutes from './RoleRoutes';
import accountRoutes from './AccountRoutes';
import authRoutes from './AuthRoutes';

export default (app: Express) => {
  const PATH_ADMIN = `${SYSTEM_CONFIG.API_VERSION}${SYSTEM_CONFIG.PREFIX_ADMIN}`;

  // Route cho sản phẩm
  app.use(`${PATH_ADMIN}/products`, authMiddleware, productRoutes);

  // Route cho danh mục sản phẩm
  app.use(`${PATH_ADMIN}/product-categories`, authMiddleware, productCategoryRoutes);

  // Route cho vai trò
  app.use(`${PATH_ADMIN}/roles`, authMiddleware, roleRoutes);

  // Route cho tài khoản
  app.use(`${PATH_ADMIN}/accounts`, authMiddleware, accountRoutes);

  // Route cho xác thực admin
  app.use(`${PATH_ADMIN}/auth`, authRoutes);
};