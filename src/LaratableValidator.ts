import LaratableConfigsInterface from './LaratableConfigsInterface';
import LaratableColumnInterface from './LaratableColumnInterface';

/**
 * LaratableValidator
 * handles all the validations to Laratable.
 *
 * @class LaratableValidator
 */
class LaratableValidator {
  /**
   * The list of HTML Table columns.
   *
   * @type {NodeList}
   * @memberof LaratableValidator
   */
  public $columns!: NodeList;

  /**
   * Validates the Laratable options.
   *
   * @param {string} selector
   * @param {LaratableConfigsInterface} options
   * @memberof LaratableValidator
   */
  public run(selector: string, options: LaratableConfigsInterface): void {
    /**
     * Let's check if you've passed a valid selector.
     */

    const $table = document.querySelector(selector);

    if (!$table) {
      throw new Error(
        `You must pass a valid table selector 
        to Laratable constructor!`,
      );
    }

    /**
     * Let's check if you've passed a table.
     */
    if ($table.tagName !== 'TABLE') {
      throw new Error(
        `You mast pass a "table" tag 
        in order to Laratable work correctly!`,
      );
    }

    /**
     * Let's check if you've thead'd it right!
     */
    const $tableHead = document.querySelector(`${selector} thead`);

    if (!$tableHead) {
      throw new Error(
        `The table must have a "thead" tag 
        in order to Laratable work correctly!`,
      );
    }

    /**
     * Let's check if you've tr'd it right!
     */
    const $tableHeadRow = document.querySelector(`${selector} thead tr`);

    if (!$tableHeadRow) {
      throw new Error(
        `The "thead" must have a "tr" tag 
        in orrder to Laratable work correctly!`,
      );
    }

    /**
     * Let's check if you've passed some columns!
     */
    const $columns: NodeList = document.querySelectorAll(`${selector} thead tr *`);

    if (!$columns.length) {
      throw new Error(
        `The "thead" must have at least 1 "th" or "td" 
        tag in order to Laratable work correctly!`,
      );
    }

    const columnsMappings: LaratableColumnInterface[] = [];

    for (const column of options.columns) {
      columnsMappings.push(column);
    }

    /**
     * Let's check if you've passed the correct columns!
     */
    if (columnsMappings.length !== $columns.length) {
      throw new Error(
        `Your columns properties object must match every element 
        in the table head in order to Laratable work correctly!`,
      );
    }

    /**
     * Will avoid querying the HTML again.
     */
    this.$columns = $columns;
  }

  /**
   * The columns from HTML Table head.
   *
   * @returns
   * @memberof LaratableValidator
   */
  public validated(): NodeList {
    return this.$columns;
  }
}

export default LaratableValidator;
