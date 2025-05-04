import { Express } from 'express';
import { SYSTEM_CONFIG } from '../../config/system';
import productRoutes from './ProductRoutes';
import authRoutes from './AuthRoutes';

export default (app: Express) => {
  const PATH_CLIENT = `${SYSTEM_CONFIG.API_VERSION}${SYSTEM_CONFIG.PREFIX_CLIENT}`;
  const PATH_AUTH = `${SYSTEM_CONFIG.API_VERSION}${SYSTEM_CONFIG.PREFIX_AUTH}`;

  // Route cho sản phẩm (client)
  app.use(`${PATH_CLIENT}/products`, productRoutes);

  // Route cho xác thực (client hoặc người dùng chung)
  app.use(PATH_AUTH, authRoutes);
};