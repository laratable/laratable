/**
 * LaratableRequestConfigsInterface
 * enforces the parameters sent do Eloquent resource.
 *
 * @interface LaratableRequestConfigsInterface
 */
interface LaratableRequestConfigsInterface {
  url: string;
  orderBy?: string;
}

export default LaratableRequestConfigsInterface;
