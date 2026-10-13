import { Router } from "express";

const router = Router();

router.get('/intraday/:symbol', (req, res) => {
  return res.json({ message: 'test' });
});

export default router;