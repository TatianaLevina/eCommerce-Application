import type React from 'react';
import '@components/Preloader/Preloader.scss';

const Preloader: React.FC<{ isHide: boolean | undefined; style: React.CSSProperties }> = ({ isHide, style }) => {
  const renderDots = (): JSX.Element[] => {
    const result: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
      result.push(<div key={i} className="clock__dots" />);
    }
    return result;
  };

  return (
    <div hidden={isHide} className="preloader" style={style}>
      <div className="preloader__container">
        <div className="preloader__img-container">
          <div className="preloader__item"></div>
          <div className="preloader__item preloader__item--mid"></div>
          <div className="preloader__item preloader__item--inner"></div>
          <div className="preloader__clock clock">
            <i className="clock__center" />
            {renderDots()}
          </div>
        </div>
        <h3 className="preloader__mesage">Loading...</h3>
      </div>
    </div>
  );
};

export default Preloader;
