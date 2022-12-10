import * as React from "react";

const SvgComponent = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM8.13627 15.8652C7.81569 15.5446 7.81569 15.0249 8.13627 14.7043L10.8391 12.0015L8.13553 9.29795C7.81494 8.97736 7.81494 8.45759 8.13553 8.13701C8.45611 7.81642 8.97588 7.81642 9.29647 8.13701L12 10.8405L14.7035 8.13701C15.0241 7.81642 15.5439 7.81642 15.8645 8.13701C16.1851 8.45759 16.1851 8.97736 15.8645 9.29795L13.1609 12.0015L15.8637 14.7043C16.1843 15.0249 16.1843 15.5446 15.8637 15.8652C15.5431 16.1858 15.0234 16.1858 14.7028 15.8652L12 13.1624L9.29721 15.8652C8.97663 16.1858 8.45686 16.1858 8.13627 15.8652Z"
      fill={props.color}
    />
  </svg>
);

export default SvgComponent;

SvgComponent.defaultProps = {
  color: "var(--icon1)",
  cursor: "pointer",
};
