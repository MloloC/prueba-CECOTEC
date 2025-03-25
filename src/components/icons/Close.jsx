const Close = ({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default Close; 