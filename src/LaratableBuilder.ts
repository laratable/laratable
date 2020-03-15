import LaratableOptionsInterface from './LaratableOptionsInterface';

/**
 * LaratableBuilder
 * is a handles HTML elements and Events.
 *
 * @class LaratableBuilder
 */
class LaratableBuilder {
  /**
   * Adds events to Laratable columns.
   *
   * @param {NodeList} $columns
   * @param {LaratableOptionsInterface} options
   * @memberof LaratableBuilder
   */
  public run($columns: NodeList, options: LaratableOptionsInterface) {
    for (const index in $columns) {
      if ($columns[index].nodeType !== 1) continue;
      (element => $columns[index].addEventListener('click', () => element))($columns[index]);
    }
  }
}

export default LaratableBuilder;
