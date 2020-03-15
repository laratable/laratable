import axios from 'axios';

class Laratable {
  constructor(selector: string, url: string, columns: Column[], options = {}) {
    /**
     * Let's check if you've passed a valid selector.
     */
    const $table = document.querySelector(selector);

    if (!$table) {
      throw new Error(`You must pass a valid table selector to Laratable constructor!`);
    }

    /**
     * Let's check if you've passed a table.
     */
    if ($table.tagName !== 'TABLE') {
      throw new Error(`You mast pass a "table" tag in order to Laratable work correctly!`);
    }

    /**
     * Let's check if you've thead'd it right!
     */
    const $tableHead = document.querySelector(`${selector} thead`);

    if (!$tableHead) {
      throw new Error(`The table must have a "thead" tag in order to Laratable work correctly!`);
    }

    /**
     * Let's check if you've tr'd it right!
     */
    const $tableHeadRow = document.querySelector(`${selector} thead tr`);

    if (!$tableHeadRow) {
      throw new Error(`The "thead" must have a "tr" tag in orrder to Laratable work correctly!`);
    }

    /**
     * Let's check if you've passed some columns!
     */
    const $columns: NodeList = $tableHeadRow.childNodes;

    if (!$columns.length) {
      throw new Error(`The "thead" must have at least 1 "th" or "td" tag in order to Laratable work correctly!`);
    }

    const columnsMappings: Column[] = [];

    for (const column of columns) {
      columnsMappings.push(column);
    }

    /**
     * Let's check if you've passed the correct columns!
     */
    if (columnsMappings.length !== $columns.length) {
      throw new Error(
        `Your columns properties object must match every element in the table head in order to Laratable work correctly!`,
      );
    }

    for (const index in $columns) {
      if ($columns[index].nodeType !== 1) continue;
      (element => $columns[index].addEventListener('click', () => this.parse(element)))($columns[index]);
    }

    axios.get(url).then(response => {
      const data = response.data;
    });
  }

  private parse(column: Node) {
    // console.log(column);
  }
}

interface Column {
  name: string;
  searchable?: boolean;
}

export default Laratable;
