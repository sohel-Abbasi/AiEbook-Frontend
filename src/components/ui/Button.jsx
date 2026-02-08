import React from "react";

const Button = ({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  icon: Icon,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    danger: "bg-transparent text-red-600 hover:bg-red-50",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm h-8 rounded-lg",
    md: "px-6 py-3 text-base h-11 rounded-xl",
    lg: "px-8 py-4 text-lg h-12 rounded-xl",
  };
  return (
    <button
      className={`inline-flex items-center gap-2 justify-center font-medium  transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500   disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2" />} {children}
        </>
      )}
    </button>
  );
};

export default Button;
