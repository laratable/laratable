import LaratableConfigsInterface from './LaratableConfigsInterface';
import LaratableResults from './LaratableResult';

/**
 * LaratablePaginate
 * creates the paginations links elements.
 *
 * @class LaratablePaginate
 */
class LaratablePaginate {
  /**
   * Creates a pagination link.
   *
   * @private
   * @param {LaratableResultPageInterface} page
   * @param {number} currentPage
   * @param {string} [tag='a']
   * @param {string} [ariaLabel='']
   * @param {*} [lastPage=-1]
   * @returns {HTMLLIElement}
   * @memberof LaratablePaginate
   */
  private createLink(
    page: LaratableResultPageInterface,
    currentPage: number,
    tag = 'a',
    ariaLabel = '',
    lastPage = -1,
  ): HTMLLIElement {
    const $li = document.createElement('li');
    $li.classList.add('page-item');

    if (ariaLabel.length > 0) {
      $li.setAttribute('aria-label', `${ariaLabel}`);
    }

    if (tag === 'span') {
      $li.classList.add('disabled');
    }

    const $a = document.createElement(tag);

    $a.classList.add('page-link');

    $a.setAttribute('href', `${page.href}`);

    if (currentPage === 1 && ariaLabel.length > 0 && lastPage < 0) {
      $li.setAttribute('aria-disabled', 'true');
      $li.classList.add('disabled');
      $a.setAttribute('aria-hidden', 'true');
    }

    if (currentPage === lastPage && ariaLabel.length > 0) {
      $li.setAttribute('aria-disabled', 'true');
      $li.classList.add('disabled');
      $a.setAttribute('aria-hidden', 'true');
    }

    if (page.value === currentPage) {
      $li.classList.add('active');
    }

    const $text = document.createTextNode(`${page.text ?? page.value}`);

    $a.appendChild($text);
    $li.appendChild($a);

    return $li;
  }

  public render(
    $table: HTMLTableElement,
    $footer: HTMLElement,
    configs: LaratableConfigsInterface,
    results: LaratableResults,
  ): void {
    const paginationSelector = `.${configs.options?.containerClassSelector} footer ul`;
    const onEachEdge = configs.options?.onEachEdge ?? 0;
    const onEachSide = configs.options?.onEachSide ?? 0;
    const prevLabel = configs.options?.prevLabel ?? '';
    const prevAriaLabel = configs.options?.prevAriaLabel ?? '';
    const nextLabel = configs.options?.nextLabel ?? '';
    const nextAriaLabel = configs.options?.nextAriaLabel ?? '';

    const $currentUl = document.querySelector(`${paginationSelector}`);
    const $ul = $currentUl ? $currentUl : document.createElement('ul');

    if ($currentUl) {
      while ($currentUl.firstChild) {
        $currentUl.removeChild($currentUl.firstChild);
      }
    } else {
      const classList = configs.options?.paginationClassSelector?.split(' ');
      classList?.forEach(className => {
        $ul.classList.add(className);
      });
    }

    const currentPage = results.currentPage();
    const lastPage = results.lastPage();

    const $li = this.createLink(
      { value: 1, href: `${results.prevPageUrl()}`, text: prevLabel },
      currentPage,
      'a',
      prevAriaLabel,
    );

    $ul.appendChild($li);

    let counter = 0;

    if (currentPage > onEachEdge + onEachSide + 1) {
      for (let i = 1; i <= onEachEdge; i++) {
        const $li = this.createLink({ value: i, href: `${results.url(i)}` }, currentPage);

        $ul.appendChild($li);
        counter++;
      }

      const $li = this.createLink({ value: 0, href: '', text: '...' }, 1, 'span');
      $ul.appendChild($li);
    }

    const pages = results.getUrlRange(counter, onEachEdge, onEachSide);
    const totalPages = pages.length;

    let _page = 0;

    for (const page of pages) {
      if (totalPages === 1) continue;

      _page = page.value;

      const $li = this.createLink(page, currentPage);
      $ul.appendChild($li);
    }

    if (_page + onEachEdge < lastPage) {
      const $li = this.createLink({ value: 0, href: '', text: '...' }, 1, 'span');
      $ul.appendChild($li);
    }

    for (let i = onEachEdge - 1; i >= 0; i--) {
      const page = lastPage - i;

      if (totalPages === 1 || page <= _page) continue;

      const $li = this.createLink({ value: page, href: `${results.url(page)}` }, currentPage);
      $ul.appendChild($li);
    }

    const $nextLi = this.createLink(
      { value: 0, href: `${results.nextPageUrl()}`, text: nextLabel },
      currentPage,
      'a',
      nextAriaLabel,
      lastPage,
    );

    $ul.appendChild($nextLi);
    $footer.appendChild($ul);

    $table.parentElement?.insertBefore($footer, $table.nextSibling);
  }
}

export default LaratablePaginate;
