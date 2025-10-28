import React, { useMemo, memo, forwardRef } from "react";

// ============================================================================
// Button.jsx - Reusable Button Component
// ============================================================================

// Moved outside component to prevent recreation on each render
const VARIANT_STYLES = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800",
  secondary:
    "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800",
  success:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
  warning:
    "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 active:bg-yellow-700",
  info: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500 active:bg-cyan-800",
  ghost:
    "bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200",
  link: "bg-transparent text-blue-600 hover:text-blue-800 hover:underline focus:ring-blue-500 p-0",
  outline:
    "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100",
};

const SIZE_STYLES = {
  xs: "px-2 py-1 text-xs gap-1",
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-base gap-2",
  lg: "px-6 py-3 text-lg gap-2.5",
  xl: "px-8 py-4 text-xl gap-3",
};

const BASE_STYLES =
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

// Memoized spinner component
const Spinner = memo(() => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
));

Spinner.displayName = "Spinner";

/**
 * Button Component
 *
 * @param {Object} props
 * @param {string} props.variant - Button variant (primary, secondary, success, danger, warning, info, ghost, link, outline)
 * @param {string} props.size - Button size (xs, sm, md, lg, xl)
 * @param {boolean} props.fullWidth - Makes button full width
 * @param {boolean} props.loading - Shows loading spinner
 * @param {boolean} props.disabled - Disables the button
 * @param {React.ReactNode} props.leftIcon - Icon to display on the left
 * @param {React.ReactNode} props.rightIcon - Icon to display on the right
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {React.Ref} ref - Forwarded ref
 */
const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled = false,
      leftIcon = null,
      rightIcon = null,
      children,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    // Memoize className computation
    const buttonClassName = useMemo(() => {
      const classes = [
        BASE_STYLES,
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        fullWidth ? "w-full" : "",
        className,
      ];
      return classes.filter(Boolean).join(" ");
    }, [variant, size, fullWidth, className]);

    // Memoize disabled state
    const isDisabled = useMemo(() => disabled || loading, [disabled, loading]);

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Spinner />}
        {!loading && leftIcon && <span>{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

// Export the Button component
export { Button };
