import axios from 'axios';
import LaratableOptionsInterface from './LaratableOptionsInterface';

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
   * @param {LaratableOptionsInterface} options
   * @memberof LaratableRequest
   */
  public run(options: LaratableOptionsInterface) {
    axios.get(options.url).then(response => {
      const data = response.data;
    });
  }
}

export default LaratableRequest;
