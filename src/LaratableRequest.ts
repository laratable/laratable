import axios from 'axios';
import LaratableRequestConfigsInterface from './LaratableRequestOptionsInterface';

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
   * @param {LaratableConfigsInterface} options
   * @memberof LaratableRequest
   */
  public run(options: LaratableRequestConfigsInterface): void {
    axios.get(options.url).then(response => {
      const data = response.data;
      console.log(data);
    });
  }
}

export default LaratableRequest;
