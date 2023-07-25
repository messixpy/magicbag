import React from "react";
import styles from "./Button.module.css";

const FlixButton = ({ label, variant }) => {
  const btnVariantClass = getVariantClass(variant);

  return (
    <button className={`${styles.button} ${btnVariantClass}`}>{label}</button>
  );
};

export default FlixButton;

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