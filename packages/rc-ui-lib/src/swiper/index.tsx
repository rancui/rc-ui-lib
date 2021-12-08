import Swiper from './Swiper';
import SwiperItem from './SwiperItem';

const SwiperNamespace = Object.assign(Swiper, { Item: SwiperItem });

export default SwiperNamespace;
export { SwiperNamespace as Swiper, SwiperItem };
export type { SwiperProps, SwiperItemProps, SwiperInstance } from './PropsType';
