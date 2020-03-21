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
        withQueryString: configs.options?.withQueryString ?? false,
        showInfo: configs.options?.showInfo ?? false,
        simplePagine: configs.options?.simplePaginate ?? false,
        onEachEdge: configs.options?.onEachEdge ?? 2,
        onEachSide: configs.options?.onEachSide ?? 3,
        prevLabel: configs.options?.prevAriaLabel ?? `‹`,
        prevAriaLabel: configs.options?.prevAriaLabel ?? `« Previous`,
        nextLabel: configs.options?.prevAriaLabel ?? `›`,
        nextAriaLabel: configs.options?.prevAriaLabel ?? `Next »`,
        infoMessage: configs.options?.infoMessage ?? `Showing :from to :to of :total entries`,
        emptyMessage: configs.options?.emptyMessage ?? `No matching entries found`,
        withPath: configs.options?.withPath ?? '',
        appends: configs.options?.appends ?? {},
        orderColumn: configs.options?.orderColumn ?? [],
        orderDirection: configs.options?.orderDirection ?? [],
        searchInputType: configs.options?.searchInputType ?? `search`,
        containerClassSelector: configs.options?.containerClassSelector ?? `laratable-container`,
        searchContainerClassSelector: configs.options?.searchContainerClassSelector ?? `laratable-search-container`,
        searchInputClassSelector: configs.options?.searchInputClassSelector ?? `laratable-search-input`,
        headerClassSelector: configs.options?.headerClassSelector ?? `laratable-header`,
        footerClassSelector: configs.options?.footerClassSelector ?? `laratable-footer`,
        loadingClassSelector: configs.options?.loadingClassSelector ?? `laratable-loading`,
        infoClassSelector: configs.options?.infoClassSelector ?? `laratable-info`,
        paginationClassSelector: configs.options?.paginationClassSelector ?? `laratable-pagination`,
      },
      selector: selector,
    };

    validator.run(selector, _configs);

    const builder = new LaratableBuilder();
    builder.run(validator.validated(), _configs);
  }
}

export default Laratable;
