import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';

const DropdownMenuNamespace = Object.assign(DropdownMenu, { Item: DropdownItem });

export default DropdownMenuNamespace;
export { DropdownMenuNamespace as DropdownMenu, DropdownItem };
export type {
  DropdownMenuProps,
  DropdownItemProps,
  DropdownMenuInstance,
  DropdownItemInstance,
} from './PropsType';
