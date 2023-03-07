import { BaseTypeProps } from '../utils';

export interface TextEllipsisProps extends BaseTypeProps {
  /** 展示的行数, 默认值为1	 */
  rows?: number | string;
  /** 需要展示的文本	 */
  content: string;
  /** 展开操作的文案	 */
  expandText?: string;
  /** 收起操作的文案	 */
  collapseText?: string;
  /** 点击	 */
  onClick?: (e: React.MouseEvent) => void;
}
