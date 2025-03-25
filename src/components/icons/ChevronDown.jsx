const ChevronDown = ({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
  </svg>
);

export default ChevronDown; 