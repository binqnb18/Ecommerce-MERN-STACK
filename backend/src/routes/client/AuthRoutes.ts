import { Router } from 'express';

const router = Router();

// Đăng nhập (dành cho client hoặc người dùng chung)
router.post('/login', (req, res) => {
  // Logic sẽ được thêm sau: xử lý đăng nhập
});

// Đăng ký (dành cho client hoặc người dùng chung)
router.post('/register', (req, res) => {
  // Logic sẽ được thêm sau: xử lý đăng ký
});

// Reset mật khẩu (dành cho client hoặc người dùng chung)
router.post('/reset-password', (req, res) => {
  // Logic sẽ được thêm sau: xử lý reset mật khẩu
});

export default router;