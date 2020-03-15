import LaratableOptions from './LaratableOptionsInterface';
import LaratableValidator from './LaratableValidator';
import LaratableBuilder from './LaratableBuilder';

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
   * @param {LaratableOptions} options
   * @memberof Laratable
   */
  static view(selector: string, options: LaratableOptions) {
    const validator = new LaratableValidator();
    validator.run(selector, options);

    const builder = new LaratableBuilder();
    builder.run(validator.validated(), options); 
  }
}

export default Laratable;
