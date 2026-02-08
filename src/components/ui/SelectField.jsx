import React from "react";

const SelectField = ({
  icon: Icon,
  label,
  name,
  selectOptions,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          className="block text-sm font-semibold text-gray-700 ml-1"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none z-10 text-gray-400 group-focus-within:text-violet-600 transition-colors duration-200">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <select
          id={name}
          name={name}
          {...props}
          className={`
            w-full h-12 pr-10 
            bg-white border-2 border-gray-100 
            text-gray-900 text-[15px] rounded-xl
            appearance-none cursor-pointer
            hover:border-gray-200 hover:bg-gray-50/50
            focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600
            transition-all duration-200
            ${Icon ? "pl-11" : "pl-4"}
            ${className}
          `}
        >
          {selectOptions?.map((option) => (
            <option
              key={option?.value || option}
              value={option?.value || option}
            >
              {option?.label || option}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none z-10 text-gray-400 group-focus-within:text-violet-600 transition-colors duration-200">
          <svg
            className="w-5 h-5 stroke-[2.5]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectField;
