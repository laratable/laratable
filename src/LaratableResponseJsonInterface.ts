/**
 * LaratableResponseJsonInterface
 * enforces how Laratable JSON should be received.
 *
 * @interface LaratableResponseJsonInterface
 */
interface LaratableResponseJsonInterface {
  current_page: number;
  data: [];
  first_page_url: string;
  from: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export default LaratableResponseJsonInterface;
