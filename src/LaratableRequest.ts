/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosResponse } from 'axios';
import LaratableResponseJsonInterface from './LaratableResponseJsonInterface';

/**
 * LaratableRequest
 * handles HTTP requests.
 *
 * @class LaratableRequest
 */
class LaratableRequest {
  /**
   * Requests Eloquent's resource through Ajax.
   *
   * @param {string} url
   * @returns {Promise<LaratableResponseJsonInterface>}
   * @memberof LaratableRequest
   */
  async run(url: string): Promise<LaratableResponseJsonInterface> {
    return await axios
      .get<LaratableResponseJsonInterface>(url)
      .then((response: AxiosResponse<LaratableResponseJsonInterface>) => {
        const { data } = response;

        const state: LaratableResponseJsonInterface = {
          current_page: data.current_page,
          data: data.data,
          first_page_url: data.first_page_url,
          from: data.from,
          last_page_url: data.last_page_url,
          next_page_url: data.next_page_url,
          path: data.path,
          per_page: data.per_page,
          prev_page_url: data.prev_page_url,
          to: data.to,
          total: data.total,
        };

        return state;
      });
  }
}

export default LaratableRequest;
