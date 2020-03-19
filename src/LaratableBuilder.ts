import LaratableConfigsInterface from './LaratableConfigsInterface';
import LaratableRequest from './LaratableRequest';
import LaratablePaginate from './LaratablePaginate';
import LaratableResponseJsonInterface from './LaratableResponseJsonInterface';
import LaratableResults from './LaratableResult';

/**
 * LaratableBuilder
 * is a handles HTML elements and Events.
 *
 * @class LaratableBuilder
 */
class LaratableBuilder {
  $container!: HTMLDivElement;
  $table!: HTMLTableElement;
  $columns!: NodeList;
  configs!: LaratableConfigsInterface;
  response!: Promise<LaratableResponseJsonInterface>;
  results!: LaratableResults;
  static queryString = '';

  /**
   * Adds events to Laratable columns.
   *
   * @param {NodeList} $columns
   * @param {LaratableConfigsInterface} configs
   * @memberof LaratableBuilder
   */
  public run($columns: NodeList, configs: LaratableConfigsInterface): void {
    this.$columns = $columns;
    this.configs = configs;
    this.response = this.makeResponse(configs.url);
    this.make();
  }

  /**
   * Makes the table as a whole.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private make(): void {
    const configs = this.configs;

    document.querySelector(`${configs.selector} tbody`)?.classList.add(`${configs.options?.loadingClassSelector}`);

    this.response
      .then(data => {
        /**
         * The result data to be used.
         */
        this.results = new LaratableResults().with(data);

        this.$table = document.querySelector(`${configs.selector}`) as HTMLTableElement;

        this.makeContainer();
        this.makeTHead();
        this.makeTBody();
        this.makePagination();
      })
      .catch(() => {
        throw new Error(`Laratable could not parse the response JSON.`);
      });
  }

  /**
   * Makes the container for holding Larable stryctyre.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private makeContainer(): void {
    const containerIdSelector = this.configs.options?.containerIdSelector;

    const $currentContainer = document.querySelector(`#${containerIdSelector}`) as HTMLDivElement;

    if ($currentContainer) {
      while ($currentContainer.firstChild) {
        $currentContainer.removeChild($currentContainer.firstChild);
      }
      this.$container = $currentContainer;
    } else {
      const $container = document.createElement('div');
      $container.setAttribute('id', `${containerIdSelector}`);
      this.$container = $container;
    }

    this.$table.parentNode?.insertBefore(this.$container, this.$table);
    this.$container.appendChild(this.$table);
  }

  /**
   * Prepares the heading for use.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private makeTHead(): void {
    const $columns = this.$columns;

    for (const index in Object.keys($columns)) {
      const $column = $columns[index] as HTMLTableRowElement;

      if ($column.nodeType !== 1) {
        continue;
      }

      $column.setAttribute('tabindex', '0');
      $column.classList.add('sorting');

      (($element: Node): void => {
        $column.addEventListener('click', (event: Event): void => {
          event.stopImmediatePropagation();
          this.listenColumnClick($element);
        });
      })($column);
    }
  }

  /**
   * Makes the table body.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private makeTBody(): void {
    const configs = this.configs;
    const data = this.results.getData();

    const $currentBody = document.querySelector(`${configs.selector} tbody`);
    const $tbody = $currentBody ? $currentBody : document.createElement('tbody');

    this.$table.style.position = 'relative';

    if ($currentBody) {
      while ($currentBody.firstChild) {
        $currentBody.removeChild($currentBody.firstChild);
      }
    }

    for (let row = 0; row < data.length; row++) {
      const $row = document.createElement('tr');

      for (let column = 0; column < configs.columns.length; column++) {
        const $column = document.createElement('td');
        const $text = document.createTextNode(data[row][configs.columns[column].name]);
        $column.appendChild($text);
        $row.appendChild($column);
      }

      $tbody.appendChild($row);
    }

    this.$table?.appendChild($tbody);
  }

  /**
   * Makes the pagination links.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private makePagination(): void {
    const paginate = new LaratablePaginate();

    paginate.render(this.$table, this.configs, this.results);

    const links: NodeList = document.querySelectorAll(`.${this.configs.options?.paginationClassSelector} li a`);

    for (const index in Object.keys(links)) {
      const link = links[index];

      if (link.nodeType !== 1) {
        continue;
      }

      ((element: Node): void => {
        link.addEventListener('click', (event: Event): void => {
          event.preventDefault();
          this.listenLinkClick(element);
        });
      })(link);
    }

    document
      .querySelector(`${this.configs.selector} tbody`)
      ?.classList.remove(`${this.configs.options?.loadingClassSelector}`);
  }

  /**
   * Makes the HTTP Request.
   *
   * @private
   * @param {string} url
   * @memberof LaratableBuilder
   */
  private async makeResponse(url: string): Promise<LaratableResponseJsonInterface> {
    const request = new LaratableRequest();
    const response = await request.run(url);
    return response;
  }

  /**
   * Listen to click event on links.
   *
   * @private
   * @param {Node} $link
   * @memberof LaratableBuilder
   */
  private listenLinkClick($link: Node): void {
    const $e = $link as HTMLTableCellElement;
    let url = $e.getAttribute('href');

    const qs = LaratableBuilder.queryString;

    if (qs.length > 0) {
      url = `${url?.replace('?', '?' + qs + '&')}`;
    }

    this.response = this.makeResponse(`${url}`);
    this.make();
  }

  /**
   * Listen to click event on table head.
   *
   * @private
   * @param {Node} $column
   * @returns {void}
   * @memberof LaratableBuilder
   */
  private listenColumnClick($column: Node): void {
    const $e = $column as HTMLTableCellElement;

    const index = $e.cellIndex;
    const configs = this.configs;
    const column = this.configs.columns[index];

    let isOrderable = column.orderable;

    if (isOrderable === undefined) isOrderable = true;
    if (!isOrderable) return;

    const sortingAsc = $e.classList.contains('sorting_asc');
    const sortingDesc = $e.classList.contains('sorting_desc');

    if (!sortingAsc) {
      const $sorting = document.querySelector(`${this.configs.selector} thead .sorting_asc`);
      $sorting?.classList.remove('sorting_asc');
    }

    if (!$e.classList.contains('sorting_asc')) {
      $e.classList.add('sorting_asc');
    }

    let sorting = 'asc';

    if (sortingAsc) {
      $e.classList.remove('sorting_asc');
      $e.classList.add('sorting_desc');
      sorting = 'desc';
    }

    if (sortingDesc) {
      $e.classList.add('sorting_asc');
      $e.classList.remove('sorting_desc');
    }

    const queryOptions: string[] = [];
    queryOptions.push(`order_column[]=${column.name}`);
    queryOptions.push(`order_direction[]=${sorting}`);

    const appends = Object.keys(configs.options?.appends ?? []);

    LaratableBuilder.queryString = `${queryOptions.join('&')}`;

    const queryString = appends.length ? `?${appends}&${queryOptions.join('&')}` : `?${queryOptions.join('&')}`;

    const url = `${configs.url}${queryString}`;

    this.response = this.makeResponse(`${url}`);
    this.make();
  }
}

export default LaratableBuilder;
