import LaratableConfigsInterface from './LaratableConfigsInterface';
import LaratableRequest from './LaratableRequest';

/**
 * LaratableBuilder
 * is a handles HTML elements and Events.
 *
 * @class LaratableBuilder
 */
class LaratableBuilder {
  $columns!: NodeList;
  options!: LaratableConfigsInterface;

  /**
   * Adds events to Laratable columns.
   *
   * @param {NodeList} $columns
   * @param {LaratableConfigsInterface} options
   * @memberof LaratableBuilder
   */
  public run($columns: NodeList, options: LaratableConfigsInterface): void {
    this.$columns = $columns;
    this.options = options;
    this.addEvents();
  }

  /**
   * Adds events to columns.
   *
   * @private
   * @param {NodeList} $columns
   * @memberof LaratableBuilder
   */
  private addEvents(): void {
    const columns = this.$columns;

    for (const index in Object.keys(columns)) {
      const column = columns[index];

      if (column.nodeType !== 1) {
        continue;
      }

      ((element: Node): void => {
        column.addEventListener('click', (): void => {
          this.listenColumnClick(element);
        });
      })(column);
    }
  }

  private listenColumnClick($column: Node): void {
    const $e = $column as HTMLTableCellElement;

    const index = $e.cellIndex;
    const options = this.options.columns[index];

    let isOrderable = options.orderable;

    if (isOrderable === undefined) isOrderable = true;
    if (!isOrderable) return;
    if (!$e.dataset.order) $e.setAttribute('data-order', 'asc');

    const request = new LaratableRequest();
    request.run({
      url: this.options.url,
      orderBy: `${options.name} ${$e.getAttribute('data-order')}`,
    });
  }
}

export default LaratableBuilder;
