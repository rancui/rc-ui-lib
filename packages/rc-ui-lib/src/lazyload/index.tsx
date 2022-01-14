import Lazyload from './Lazyload';
import LazyloadImage from './LazyloadImage';

const LazyloadNamespace = Object.assign(Lazyload, { Image: LazyloadImage });

export default LazyloadNamespace;
export { LazyloadNamespace as Lazyload, LazyloadImage };
export type { LazyloadProps, LazyloadImageProps } from './PropsType';
