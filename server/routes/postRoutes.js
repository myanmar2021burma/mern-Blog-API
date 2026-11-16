const { Router } = require('express');
const { 
  createPost, 
  getPosts, 
  getPost, 
  getCatPosts, 
  getUserPosts, 
  editPost, 
  deletePost 
} = require('../controllers/postControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

// ၁။ ပိုစ်အသစ်ဖန်တီးရန် (POST method အတွက် ID မပါရပါ)
router.post('/', authMiddleware, createPost); // (လိုအပ်ရင် authMiddleware ထည့်ပါ)

// ၂။ အထူး သီးသန့် route များကို ID dynamic route ရဲ့ အပေါ်ဆုံးတွင် ထားပါ
router.get('/categories/:category', getCatPosts);
router.get('/users/:id', getUserPosts);

// ၃။ ပိုစ်အားလုံးကို ယူရန်
router.get('/', getPosts);

// ၄။ ID ပါသော dynamic route များကို အောက်ဆုံးသို ပိုပါ
router.get('/:id', getPost);
router.patch('/:id', authMiddleware, editPost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;