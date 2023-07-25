import React from "react";
import styles from "./Button.module.css";

const ClaimButton = ({ label, variant,onClick }) => {
  const btnVariantClass = getVariantClass(variant);

  return (
    <button onClick={onClick} className={`${styles.button} ${btnVariantClass}`}>{label}</button>
  );
};

export default ClaimButton;

const getVariantClass = (variant) => {
  switch (variant) {
    case "solid":
      return styles.solid;
    case "outline":
      return styles.outline;
    case "lightSolid":
      return styles.lightSolid;
    default:
      return styles.default;
  }
};