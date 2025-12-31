import React, { isValidElement, useContext } from 'react';
import classnames from 'classnames';
import { EmptyProps } from './PropsType';
import { getSizeStyle } from '../utils';
import { Network } from './Network';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const PRESET_IMAGES = ['error', 'search', 'default'];

const Empty: React.FC<EmptyProps> = (props) => {
  const { 
    image = 'default',
    description,
    imageSize,
    className,
    style,
    children,
  } = props;

  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('empty', prefixCls);

  const renderImage = () => {
    let imageValue = image;

    if (isValidElement(imageValue)) {
      return imageValue;
    }

    if (imageValue === 'network') {
      return Network;
    }

    if (PRESET_IMAGES.includes(imageValue as string)) {
      imageValue = `https://img.yzcdn.cn/vant/empty-image-${imageValue}.png`;
    }

    return <img src={imageValue as string} alt="" />;
  };

  const renderDescription = () => {
    if (description) {
      return <p className={classnames(bem('description'))}>{description}</p>;
    }
    return null;
  };

  const renderBottom = () => {
    if (children) {
      return <div className={classnames(bem('bottom'))}>{children}</div>;
    }
    return null;
  };

  return (
    <div className={classnames(className, bem())} style={style}>
      <div className={classnames(bem('image'))} style={getSizeStyle(imageSize)}>
        {renderImage()}
      </div>
      {renderDescription()}
      {renderBottom()}
    </div>
  );
};

export default Empty;
