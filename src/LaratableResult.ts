import LaratableResponseJsonInterface from './LaratableResponseJsonInterface';

class LaratableResults {
  _results!: LaratableResponseJsonInterface;

  with(data: LaratableResponseJsonInterface): LaratableResults {
    this._results = data;
    return this;
  }

  data(): LaratableResponseJsonInterface {
    return this._results;
  }

  getData(): [] {
    return this._results.data;
  }

  count(): number {
    return this._results.total;
  }

  currentPage(): number {
    return this._results.current_page;
  }

  currentPageUrl(): string {
    return this.url(this.currentPage());
  }

  firstItem(): number {
    return this._results.from;
  }

  getUrlRange(counter: number, onEachEdge: number, onEachSide: number): LaratableResultPageInterface[] {
    const currentPage = this.currentPage();
    const totalBothSides = onEachSide * 2 + 1;

    function range(j: number, k: number): number[] {
      // eslint-disable-next-line prefer-spread
      return Array.apply(null, Array(k - j + 1)).map(function(_, n) {
        return n + j;
      });
    }

    const lastPage = this.lastPage();
    let left = counter === 0 ? 1 : currentPage - onEachSide;
    let right = left === 1 ? totalBothSides : currentPage + onEachSide;

    const diff = lastPage - right;

    if (right > lastPage - 1) {
      right = lastPage;
      left = diff === onEachSide ? left + diff : left + diff - onEachSide + 1;
    }

    if (diff === 1) left = left - 1;

    if (left < 0) left = 1;

    const pages: LaratableResultPageInterface[] = [];

    const _range = range(left, right);
    _range.forEach((page: number) => {
      pages.push({
        value: page,
        href: this.url(page),
      });
    });

    return pages;
  }

  hasMorePages(): boolean {
    return true;
  }

  lastItem(): number {
    return this._results.to;
  }

  lastPage(): number {
    const queryPart = this._results.last_page_url.split('?');
    const pagePart = queryPart.filter(item => {
      return item.includes('page=');
    });

    return pagePart.length > 0 ? parseInt(pagePart[0].replace('page=', '')) : 0;
  }

  prevPageUrl(): string {
    return this._results.prev_page_url;
  }

  nextPageUrl(): string {
    return this._results.next_page_url;
  }

  firstPageUrl(): string {
    return this._results.first_page_url;
  }

  lastPageUrl(): string {
    return this._results.last_page_url;
  }

  onFirstPage(): boolean {
    return true;
  }

  url(page?: number): string {
    if (!page) return `${this._results.path}`;
    return `${this._results.path}?page=${page}`;
  }
}

export default LaratableResults;
