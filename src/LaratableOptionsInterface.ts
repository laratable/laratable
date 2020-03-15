import LaratableColumnInterface from './LaratableColumnInterface';
import LaratableOptionsExtraInterface from './LaratableOptionsExtraInterface';

/**
 * LaratableOptionsInterface
 * enforces how Laratable options must be set.
 *
 * @interface LaratableOptionsInterface
 */
interface LaratableOptionsInterface {
  url: string;
  columns: LaratableColumnInterface[];
  options?: LaratableOptionsExtraInterface;
}

export default LaratableOptionsInterface;
