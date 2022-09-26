import styles from "./ConfModal.module.css";
import { useState } from "react";
import Loading from "./Loading";

const ConfModal = ({ attdocurl, attimgurl, delAtt, messSub }) => {
  const [loading, setLoading] = useState(true);

  const StopLoading = () => {
    setLoading(false);
  };
  return (
    <div className={styles.Modal}>
      <button className={styles.Close} onClick={delAtt}>
        X
      </button>
      {loading && !attimgurl && !attdocurl && (
        <div className={styles.LoadingContainer}>
          <Loading />
        </div>
      )}
      {attimgurl && (
        <div className={styles.ImgContainer}>
          <img src={attimgurl} width="70%" onLoad={StopLoading} alt="" />
        </div>
      )}
      {attdocurl && (
        <iframe
          className={styles.IframeModal}
          onLoad={StopLoading}
          src={attdocurl}
          title="preview"
        ></iframe>
      )}
      <br />
      {!loading && (
        <button className={styles.Send} onClick={messSub}>
          SEND
        </button>
      )}
    </div>
  );
};
export default ConfModal;
