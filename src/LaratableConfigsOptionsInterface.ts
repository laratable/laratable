/**
 * LaratableConfigsOptionsInterface
 * enforces how Laratable custom options should be set.
 *
 * @interface LaratableConfigsOptionsInterface
 */
interface LaratableConfigsOptionsInterface {
  showInfo?: boolean;
  simplePaginate?: false;
  appends?: string[];
  fragment?: string;
  onEachEdge?: number;
  onEachSide?: number;
  prevLabel?: string;
  prevAriaLabel?: string;
  nextLabel?: string;
  nextAriaLabel?: string;
  withPath?: string;
  orderBy?: string;
  paginationClassSelector?: string;
  loadingClassSelector?: string;
  containerIdSelector?: string;
}

export default LaratableConfigsOptionsInterface;
