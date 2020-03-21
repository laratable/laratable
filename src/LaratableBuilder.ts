import LaratableConfigsInterface from './LaratableConfigsInterface';
import LaratableRequest from './LaratableRequest';
import LaratablePaginate from './LaratablePaginate';
import LaratableResponseJsonInterface from './LaratableResponseJsonInterface';
import LaratableResults from './LaratableResult';
import { debounce } from './debounce';

/**
 * LaratableBuilder
 * is a handles HTML elements and Events.
 *
 * @class LaratableBuilder
 */
class LaratableBuilder {
  $container!: HTMLDivElement;
  $header!: HTMLElement;
  $search!: HTMLElement;
  $table!: HTMLTableElement;
  $footer!: HTMLElement;
  $info!: HTMLElement;
  $columns!: NodeList;
  configs!: LaratableConfigsInterface;
  response!: Promise<LaratableResponseJsonInterface>;
  results!: LaratableResults;
  private static queryString: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static orderColumn: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static orderDirection: any[];
  private static searchValue = '';

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

    this.buildQueryString();

    this.response = this.makeResponse(this.buildUrl(configs.url));

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

        if (!this.$container) this.makeContainer();
        if (!this.$header) this.makeHeader();
        if (!this.$search) this.makeSearch();
        this.makeTHead();
        this.makeTBody();
        if (!this.$footer) this.makeFooter();
        this.makeInfo();
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
    const containerClassSelector = this.configs.options?.containerClassSelector;

    const $currentContainer = document.querySelector(`.${containerClassSelector}`) as HTMLDivElement;

    if ($currentContainer) {
      while ($currentContainer.firstChild) {
        $currentContainer.removeChild($currentContainer.firstChild);
      }
      this.$container = $currentContainer;
    } else {
      const $container = document.createElement('div');
      $container.classList.add(`${containerClassSelector}`);
      this.$container = $container;
    }

    this.$table.parentNode?.insertBefore(this.$container, this.$table);
    this.$container.appendChild(this.$table);
  }

  /**
   * Makes the nav container for info and pagination.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private makeHeader(): void {
    const $header = document.createElement('header');

    const classList = this.configs.options?.headerClassSelector?.split(' ');
    classList?.forEach(className => {
      $header.classList.add(className);
    });

    this.$table.parentNode?.insertBefore($header, this.$table);

    this.$header = $header;
  }

  /**
   * Makes the search.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private makeSearch(): void {
    const $search = document.createElement('div');

    const containerClassList = this.configs.options?.searchContainerClassSelector?.split(' ');

    containerClassList?.forEach(className => {
      $search.classList.add(className);
    });

    const $input = document.createElement('input') as HTMLInputElement;
    $input.setAttribute('type', 'search');

    const inputClassList = this.configs.options?.searchInputClassSelector?.split(' ');

    inputClassList?.forEach(className => {
      $input.classList.add(className);
    });

    $search.appendChild($input);
    this.$search = $search;

    this.$header.appendChild($search);

    $input?.addEventListener(
      'keyup',
      debounce((event: Event) => {
        event.stopImmediatePropagation();
        this.listenSearchKeyup($input);
      }, 250),
    );
  }

  /**
   * Makes the nav container for info and pagination.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private makeFooter(): void {
    const $footer = document.createElement('footer');

    const classList = this.configs.options?.footerClassSelector?.split(' ');
    classList?.forEach(className => {
      $footer.classList.add(className);
    });

    this.$footer = $footer;
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

    if (data.length === 0) {
      const $column = document.createElement('td');
      $column.classList.add('empty');
      const $text = document.createTextNode(`${configs.options?.emptyMessage}`);
      $column.setAttribute('colspan', `${configs.columns.length}`);
      $column.appendChild($text);

      const $row = document.createElement('tr');
      $row.appendChild($column);
      $tbody.appendChild($column);
    }

    this.$table?.appendChild($tbody);
  }

  /**
   * Makes the
   *
   * @private
   * @memberof LaratableBuilder
   */
  private makeInfo(): void {
    if (this.$info) {
      this.$info.parentNode?.removeChild(this.$info);
    }

    const $info = document.createElement('div');

    const classList = this.configs.options?.infoClassSelector?.split(' ');
    classList?.forEach(className => {
      $info.classList.add(className);
    });

    const text = `${this.configs.options?.infoMessage}`
      .replace(':from', `${this.results.firstItem()}`)
      .replace(':to', `${this.results.lastItem()}`)
      .replace(':total', `${this.results.count()}`);

    const $text = document.createTextNode(text);
    $info.appendChild($text);

    this.$info = $info;
    this.$footer.appendChild($info);
  }

  /**
   * Makes the pagination links.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private makePagination(): void {
    const paginate = new LaratablePaginate();

    paginate.render(this.$table, this.$footer, this.configs, this.results);

    const links: NodeList = document.querySelectorAll(
      `.${this.configs.options?.containerClassSelector} footer ul li a`,
    );

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
   * Builds the QueryString for the URL on any scenerios.
   *
   * @private
   * @memberof LaratableBuilder
   */
  private buildQueryString(): void {
    const queryOptions: string[] = [];
    const appends = this.configs.options?.appends ?? {};
    const appendsKeys = Object.keys((appends as object) ?? []);

    for (const key in appendsKeys) {
      const appendKey = appendsKeys[key];
      const appendValue = appends[appendKey];
      queryOptions.push(`${appendKey}=${appendValue.toString()}`);
    }

    if (LaratableBuilder.orderColumn) {
      for (const index in Object.keys(LaratableBuilder.orderColumn)) {
        const column = LaratableBuilder.orderColumn[index];
        const direction = LaratableBuilder.orderDirection[index];

        queryOptions.push(`order_column[]=${column}`);
        queryOptions.push(`order_direction[]=${direction}`);
      }
    } else {
      const columns = this.configs.options?.orderColumn ?? [];
      const directions = this.configs.options?.orderDirection ?? [];

      columns.forEach(column => {
        queryOptions.push(`order_column[]=${column}`);
      });

      directions.forEach(direction => {
        queryOptions.push(`order_direction[]=${direction}`);
      });
    }

    if (LaratableBuilder.searchValue.length > 0) {
      queryOptions.push(`search=${LaratableBuilder.searchValue}`);
    }

    LaratableBuilder.queryString = `${queryOptions.join('&')}`;
  }

  /**
   * Builds the url with query strig.
   *
   * @private
   * @param {string} url
   * @returns {string}
   * @memberof LaratableBuilder
   */
  private buildUrl(url: string): string {
    const qs = LaratableBuilder.queryString;

    return url.includes('?page=') ? `${url?.replace('?', '?' + qs + '&')}` : `${url}?${qs}`;
  }

  /**
   * Listen to search input.
   *
   * @private
   * @param {HTMLInputElement} $input
   * @memberof LaratableBuilder
   */
  private listenSearchKeyup($input: HTMLInputElement): void {
    LaratableBuilder.searchValue = $input.value;
    this.buildQueryString();

    this.response = this.makeResponse(this.buildUrl(`${this.results.currentPageUrl()}`));

    this.make();
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
    const url = $e.getAttribute('href');

    this.buildQueryString();

    this.response = this.makeResponse(this.buildUrl(`${url}`));

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

    const $allSortings = document.querySelectorAll(`${configs.selector} thead tr *`);

    $allSortings.forEach($element => {
      $element.classList.remove('sorting_asc');
      $element.classList.remove('sorting_desc');
    });

    let sorting = 'asc';

    if (sortingAsc) {
      $e.classList.add('sorting_desc');
      sorting = 'desc';
    }

    if (sortingDesc || (!sortingAsc && !sortingDesc)) {
      $e.classList.add('sorting_asc');
    }

    /**
     * In this case order must be reset.
     */
    LaratableBuilder.orderColumn = [`${column.name}`];
    LaratableBuilder.orderDirection = [`${sorting}`];

    const url = `${configs.url}`;

    this.buildQueryString();

    this.response = this.makeResponse(this.buildUrl(`${url}`));

    this.make();
  }
}

export default LaratableBuilder;
