import Button from './Button';
import ButtonGroup from './ButtonGroup';

const ButtonNameSpace = Object.assign(Button, { Group: ButtonGroup });
export default ButtonNameSpace;
export { ButtonNameSpace as Button, ButtonGroup };
export type { ButtonProps, ButtonType, ButtonSize, ButtonIconPosition } from './PropsType';
