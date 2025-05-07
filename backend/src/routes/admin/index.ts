import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import productRoutes from './ProductRoutes';
import productCategoryRoutes from './ProductCategoryRoutes';
import roleRoutes from './RoleRoutes';
import accountRoutes from './AccountRoutes';
import authRoutes from './AuthRoutes';

const router = Router();

console.log('Attaching admin routes');

// Route cho sản phẩm
router.use('/products', authMiddleware, productRoutes);

// Route cho danh mục sản phẩm
router.use('/product-categories', authMiddleware, productCategoryRoutes);

// Route cho vai trò
router.use('/roles', authMiddleware, roleRoutes);

// Route cho tài khoản
router.use('/accounts', authMiddleware, accountRoutes);

// Route cho xác thực admin
router.use('/auth', authRoutes);

export default router;