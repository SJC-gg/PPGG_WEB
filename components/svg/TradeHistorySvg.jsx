import * as React from "react";

const SvgComponent = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#clip0_14795_79857)">
      <path
        d="M15.5 16C15.7761 16 16 15.7761 16 15.5V13.2071C16 12.7617 16.5386 12.5386 16.8536 12.8536L20.6464 16.6464C20.8417 16.8417 20.8417 17.1583 20.6464 17.3536L16.8536 21.1464C16.5386 21.4614 16 21.2383 16 20.7929V18.5C16 18.2239 15.7761 18 15.5 18H4.5C4.22386 18 4 17.7761 4 17.5V16.5C4 16.2239 4.22386 16 4.5 16H15.5ZM7.14645 2.85355C7.46143 2.53857 8 2.76165 8 3.20711V5.49904C8 5.77517 8.22383 5.99902 8.49996 5.99904L19.5 5.99996C19.7762 5.99998 20 6.22383 20 6.49996V7.5C20 7.77614 19.7761 8 19.5 8H8.5C8.22386 8 8 8.22386 8 8.5V10.7929C8 11.2383 7.46143 11.4614 7.14645 11.1464L3.35355 7.35355C3.15829 7.15829 3.15829 6.84171 3.35355 6.64645L7.14645 2.85355Z"
        fill={props.color}
      />
    </g>
    <defs>
      <clipPath id="clip0_14795_79857">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgComponent;

SvgComponent.defaultProps = {
  color: "var(--icon1)",
  cursor: "pointer",
};
