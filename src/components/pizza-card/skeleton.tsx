import ContentLoader from "react-content-loader";
import styles from "./skeleton.module.scss";

const Skeleton = () => (
  <ContentLoader
    className={styles.skeleton}
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="124" r="120" />
    <rect x="-1" y="258" rx="10" ry="10" width="280" height="25" />
    <rect x="1" y="312" rx="9" ry="9" width="277" height="89" />
    <rect x="123" y="418" rx="25" ry="25" width="152" height="45" />
    <rect x="3" y="427" rx="6" ry="6" width="90" height="30" />
  </ContentLoader>
);

export { Skeleton };
