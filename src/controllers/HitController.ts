import { Request, Response } from 'express';
import HitService from '../services/HitService';
import { hits } from '../db/hits';
import { SortParam, Order } from '../types/types';

class HitController {
  async getAll(req: Request<{}, {}, {}, { q: string }>, res: Response) {
    let { q } = req.query;
    try {
      await HitService.getAll(q);

      res.json({ result: 'success' });
    } catch (error) {
      res.status(400).json({ result: 'fail', error });
    }
  }

  sortHits(req: Request<{}, {}, {}, { param: SortParam, order: Order }>, res: Response) {
    if (hits.length > 0) {
      const { param, order } = req.query;
      HitService.sortHits(param, order);

      res.json({ result: 'success' });
    }

    res.status(400).json({ result: 'fail', error: 'Hits array is empty' })
  }

  getHitsByPage(req: Request<{ page: string }, {}, {}, {}>, res: Response) {
    if (hits.length > 0) {
      const { page } = req.params;
      const result = HitService.getHitsByPage(+page);

      res.json(result);
    }

    res.status(404).send({ result: 'fail', error: 'Hits array is empty' });
  }
}

export default new HitController();