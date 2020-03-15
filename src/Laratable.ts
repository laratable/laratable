import LaratableConfigsInterface from './LaratableConfigsInterface';
import LaratableValidator from './LaratableValidator';
import LaratableBuilder from './LaratableBuilder';
import LaratableRequest from './LaratableRequest';

/**
 * Laratable
 * is a Vanilla JS AJAX Library to make
 * dynamic HTML Tables for Laravel's Eloquent.
 *
 * @class Laratable
 */
class Laratable {
  /**
   * Render the HTML Table.
   *
   * @static
   * @param {string} selector
   * @param {LaratableConfigs} configs
   * @memberof Laratable
   */
  static view(selector: string, configs: LaratableConfigsInterface): void {
    const validator = new LaratableValidator();
    validator.run(selector, configs);

    const builder = new LaratableBuilder();
    builder.run(validator.validated(), configs);

    const request = new LaratableRequest();

    request.run({
      url: configs.url,
      orderBy: configs.options?.orderBy
    });
  }
}

export default Laratable;
