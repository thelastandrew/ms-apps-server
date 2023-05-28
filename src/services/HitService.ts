import axios from 'axios';
import { config } from 'dotenv';
import { IHit, hits } from '../db/hits';
import { SortParam, Order } from '../types/types';

config();

const baseURL = 'https://pixabay.com/api/';
const key = process.env.API_KEY;
const LIMIT = 9;

type PixBayResponse = {
  total: number,
  totalHits: number,
  hits: IHit[],
}

class HitService {
  async getAll(q: string) {
    hits.length = 0;

    for (let page = 1; page <= 3; page++) {
      const chunk = await axios.get<PixBayResponse>(baseURL, {
        params: {
          key,
          q,
          page,
          per_page: 200,
        }
      });

      hits.push(...chunk.data.hits);
    }
  }

  sortHits(param: SortParam, order: Order) {
    hits.sort((a, b) => {
      if (order === Order.ASC) {
        return a[param] - b[param];
      }

      return b[param] - a[param];
    })
  }

  getHitsByPage(page: number) {
    const totalHits = hits.length;
    const totalPages = Math.ceil(totalHits / LIMIT);

    const start = (page - 1) * LIMIT;
    const end = start + LIMIT;

    const prev = page === 1 ? null : page - 1;
    const next = page === totalPages ? null : page + 1;

    const hitsToShow = hits.slice(start, end);

    return {
      totalHits,
      totalPages,
      prev,
      next,
      hits: hitsToShow
    }
  }
}

export default new HitService();