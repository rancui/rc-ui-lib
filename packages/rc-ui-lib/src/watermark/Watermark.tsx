import React, { useContext, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { WatermarkProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Watermark: React.FC<WatermarkProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('water-mark', prefixCls);
  const {
    width,
    height,
    zIndex,
    content,
    image,
    rotate,
    fullPage,
    gapX,
    gapY,
    textColor,
    opacity,
    children,
  } = props;
  const [imageBase64, setImageBase64] = useState('');
  const svgElRef = useRef<HTMLDivElement>();
  const [watermarkUrl, setWatermarkUrl] = useState('');
  const renderWatermark = () => {
    const rotateStyle = {
      transformOrigin: 'center',
      transform: `rotate(${rotate}deg)`,
    };

    const svgInner = () => {
      if (image && !children) {
        return (
          <image
            href={imageBase64}
            // Compatite for versions below Safari 12
            // More detail: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href
            // @ts-ignore
            xlinkHref={imageBase64}
            x="0"
            y="0"
            width={width}
            height={height}
            style={rotateStyle}
          />
        );
      }

      return (
        <foreignObject x="0" y="0" width={width} height={height}>
          <div
            // @ts-ignore
            xmlns="http://www.w3.org/1999/xhtml"
            style={rotateStyle}
          >
            {children || <span style={{ color: textColor }}>{content}</span>}
          </div>
        </foreignObject>
      );
    };

    const svgWidth = width + gapX;
    const svgHeight = height + gapY;

    return (
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width={svgWidth}
        height={svgHeight}
        xmlns="http://www.w3.org/2000/svg"
        // xlink namespace for compatite image xlink attribute
        // @ts-ignore
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          padding: `0 ${gapX}px ${gapY}px 0`,
          opacity: opacity,
          display: 'none',
        }}
      >
        {svgInner()}
      </svg>
    );
  };

  const makeImageToBase64 = (url: string) => {
    const canvas = document.createElement('canvas');
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.referrerPolicy = 'no-referrer';
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(image, 0, 0);
      setImageBase64(canvas.toDataURL());
    };
    image.src = url;
  };
  const makeSvgToBlobUrl = (svgStr: string) => {
    // svg MIME type: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const svgBlob = new Blob([svgStr], {
      type: 'image/svg+xml',
    });
    return URL.createObjectURL(svgBlob);
  };

  useEffect(() => {
    if (svgElRef.current) {
      if (watermarkUrl) {
        URL.revokeObjectURL(watermarkUrl);
      }
      setWatermarkUrl(makeSvgToBlobUrl(svgElRef.current.innerHTML));
    }
  }, [imageBase64, gapX, gapY, content, textColor, width, height, rotate]);
  useEffect(() => {
    if (image) makeImageToBase64(image);
  }, [image]);
  useEffect(() => {
    return () => {
      if (watermarkUrl) {
        URL.revokeObjectURL(watermarkUrl);
      }
    };
  }, []);
  return (
    <div
      className={classnames(bem({ full: fullPage }))}
      style={{
        zIndex,
        backgroundImage: `url(${watermarkUrl})`,
        backgroundSize: `${gapX + width}px ${gapY + height}px `,
      }}
    >
      <div ref={svgElRef}>{renderWatermark()}</div>
    </div>
  );
};

Watermark.defaultProps = {
  width: 100,
  height: 100,
  zIndex: 100,
  rotate: -22,
  fullPage: false,
  gapX: 0,
  gapY: 0,
  textColor: '#dcdee0',
};

export default Watermark;
