/**
 * LaratableColumnInterface
 * enforces how Laratable columns should be set.
 *
 * @interface LaratableColumnInterface
 */
interface LaratableColumnInterface {
  name: string;
  orderable?: boolean;
  searchable?: boolean;
}

export default LaratableColumnInterface;
