import LaratableColumnInterface from './LaratableColumnInterface';
import LaratableConfigsOptionsInterface from './LaratableConfigsOptionsInterface';

/**
 * LaratableConfigsInterface
 * enforces how Laratable options must be set.
 *
 * @interface LaratableConfigsInterface
 */
interface LaratableConfigsInterface {
  url: string;
  columns: LaratableColumnInterface[];
  options?: LaratableConfigsOptionsInterface;
  selector?: string;
}

export default LaratableConfigsInterface;
