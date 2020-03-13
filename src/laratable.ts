import axios from 'axios';

interface Column {
  name: string,
  searchable?: boolean,
}

export class Laratable {

  constructor(selector: string, url: string, columns: object = {}, options: object = {}) {

    /**
     * Let's check if you've passed a valid selector.
     */
    let $table = document.querySelector(selector);

    if (!$table) {
      throw new Error(`You must pass a valid table selector to Laratable constructor!`);
    }

    /**
     * Let's check if you've passed a table.
     */
    if ($table.tagName !== 'TABLE') {
      throw new Error(`You mast pass a "table" tag in order to Laratable work correctly!`)
    }


    /**
     * Let's check if you've thead'd it right!
     */
    let $tableHead = document.querySelector(`${selector} thead`);

    if (!$tableHead) {
      throw new Error(`The table must have a "thead" tag in order to Laratable work correctly!`);
    }

    /**
     * Let's check if you've tr'd it right!
     */
    let $tableHeadRow = document.querySelector(`${selector} thead tr`);

    if (!$tableHeadRow) {
      throw new Error(`The "thead" must have a "tr" tag in orrder to Laratable work correctly!`);
    }

    /**
     * Let's check if you've passed some columns!
     */
    let $columns = $tableHeadRow.children;

    if (!$columns.length) {
      throw new Error(`The "thead" must have at least 1 "th" or "td" tag in order to Laratable work correctly!`);
    }

    let columnsMappings: Array<Column> = [];

    for (let column of <any>columns) {
      columnsMappings.push(column);
    }

    /**
     * Let's check if you've passed the correct columns!
     */
    if (columnsMappings.length !== $columns.length) {
      throw new Error(`Your columns properties object must match every element in the table head in order to Laratable work correctly!`);
    }

    for (let $column of <any>$columns) {
      ((element) => $column.addEventListener('click', () => this.parse(element)))($column);
    }

    axios.get(url).then(response => {
      let data = response.data;
    });
  }

  parse(column:HTMLElement) {
    console.log(column);
  }
}