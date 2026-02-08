import React from "react";

const InputField = ({ icon: Icon, label, name, type = "text", ...props }) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
          </div>
        )}
        <input
          id={name}
          type={type}
          name={name}
          className={`block w-full pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-100 focus:border-violet-500 transition-all bg-white text-gray-900 placeholder-gray-400 outline-none ${
            Icon ? "pl-10" : "pl-3"
          }`}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;
