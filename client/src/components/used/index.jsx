import './used.scss';

export const Loading = ({styles, light, main}) => (
  main
    ? <div data-testid='loadingRing' className={`loading-ring ${light ? 'light' : ''}`}/>
    : <div data-testid='loadingContainer' className="loading-container" style={styles ? styles : {}}>
        <div data-testid='loadingRing' className={`loading-ring ${light ? 'light' : ''}`}/>
      </div>
);
