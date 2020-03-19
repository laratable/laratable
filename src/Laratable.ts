import LaratableConfigsInterface from './LaratableConfigsInterface';
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
   * @param {LaratableConfigs} configs
   * @memberof Laratable
   */
  static view(selector: string, configs: LaratableConfigsInterface): void {
    const validator = new LaratableValidator();

    const _configs = {
      url: configs.url,
      columns: configs.columns,
      options: {
        showInfo: configs.options?.showInfo ?? false,
        simplePagine: configs.options?.simplePaginate ?? false,
        onEachEdge: configs.options?.onEachEdge ?? 2,
        onEachSide: configs.options?.onEachSide ?? 3,
        prevLabel: configs.options?.prevAriaLabel ?? `‹`,
        prevAriaLabel: configs.options?.prevAriaLabel ?? `« Previous`,
        nextLabel: configs.options?.prevAriaLabel ?? `›`,
        nextAriaLabel: configs.options?.prevAriaLabel ?? `Next »`,
        withPath: configs.options?.withPath ?? '',
        appends: configs.options?.appends ?? [],
        paginationClassSelector: configs.options?.paginationClassSelector ?? `pagination`,
        loadingClassSelector: configs.options?.loadingClassSelector ?? `loading`,
        containerIdSelector: configs.options?.containerIdSelector ?? `laratableContainer`,
      },
      selector: selector,
    };

    validator.run(selector, _configs);

    const builder = new LaratableBuilder();
    builder.run(validator.validated(), _configs);
  }
}

export default Laratable;
