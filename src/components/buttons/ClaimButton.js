import React from "react";
import styles from "./Button.module.css";

const ClaimButton = ({ label, variant, onClick, isDisabled }) => {
  const btnVariantClass = getVariantClass(variant);

  const disabledClass = isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${styles.button} ${btnVariantClass} ${disabledClass}`}
    >
      {label}
    </button>
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
