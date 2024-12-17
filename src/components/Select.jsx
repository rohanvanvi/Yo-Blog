import React, { useId } from 'react';

function Select(
  {
    options = [],
    label,
    className,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {/* Label for the select input */}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 mb-2 block"
        >
          {label}
        </label>
      )}

      {/* The Select input */}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-3 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent duration-200 border border-gray-300 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
