import React from "react";
import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

const FlixButton = ({ label, variant }) => {
  const btnVariantClass = getVariantClass(variant);
const nav=useNavigate()
  return (
    <a href="https://app.uniswap.org/#/swap?outputCurrency=0x418afee14a1fd9c05c4df05e033f7c3d46aeb905" target="_blank" className={`${styles.button} ${btnVariantClass}`}>{label}</a>
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