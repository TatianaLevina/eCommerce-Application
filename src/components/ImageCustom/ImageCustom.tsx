import { useState } from 'react';

import type ImgProps from '@components/ImageCustom/ImgProps.interface';
import Preloader from '@components/Preloader/Preloader';

const ImageCustom: React.FC<ImgProps> = ({ src, alt, className, style }: ImgProps) => {
  const [hidden, setHidden] = useState(true);

  const onImageLoaded = (): void => {
    setHidden(false);
  };

  return (
    <>
      <Preloader isHide={!hidden} style={{ width: '100%', position: 'relative' }}></Preloader>
      <img
        hidden={hidden}
        src={src}
        alt={alt}
        className={className}
        style={style}
        onLoad={onImageLoaded}
        decoding="async"
      />
    </>
  );
};

export default ImageCustom;
