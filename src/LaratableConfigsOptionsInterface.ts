/**
 * LaratableConfigsOptionsInterface
 * enforces how Laratable custom options should be set.
 *
 * @interface LaratableConfigsOptionsInterface
 */

interface LaratableConfigsOptionsInterface {
  showInfo?: boolean;
  simplePaginate?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appends?: any;
  fragment?: string;
  withQueryString: boolean;
  onEachEdge?: number;
  onEachSide?: number;
  prevLabel?: string;
  prevAriaLabel?: string;
  nextLabel?: string;
  nextAriaLabel?: string;
  infoMessage?: string;
  emptyMessage?: string;
  withPath?: string;
  orderColumn?: string[];
  orderDirection?: string[];
  searchInputType?: string;
  containerClassSelector?: string;
  searchContainerClassSelector?: string;
  searchInputClassSelector?: string;
  loadingClassSelector?: string;
  headerClassSelector?: string;
  footerClassSelector?: string;
  infoClassSelector?: string;
  paginationClassSelector?: string;
}

export default LaratableConfigsOptionsInterface;
