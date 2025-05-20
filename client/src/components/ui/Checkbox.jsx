import { forwardRef } from 'react';

/**
 * Reusable Checkbox component for forms
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Checkbox ID (required for accessibility)
 * @param {string} props.name - Checkbox name attribute
 * @param {string} props.label - Label text
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {function} props.onChange - Change handler function
 * @param {boolean} props.required - Whether the checkbox is required
 * @param {string} props.error - Error message to display
 * @param {boolean} props.disabled - Whether the checkbox is disabled
 * @param {string} props.className - Additional CSS classes for the checkbox
 * @param {string} props.labelClassName - Additional CSS classes for the label
 * @param {string} props.containerClassName - Additional CSS classes for the container
 */
const Checkbox = forwardRef(({
  id,
  name,
  label,
  checked,
  onChange,
  required = false,
  error,
  disabled = false,
  className = '',
  labelClassName = '',
  containerClassName = '',
  ...rest
}, ref) => {
  return (
    <div className={`flex items-start ${containerClassName}`}>
      <div className="flex items-center h-5">
        <input
          ref={ref}
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${className} ${
            disabled ? 'cursor-not-allowed opacity-60' : ''
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label 
            htmlFor={id} 
            className={`text-gray-700 ${labelClassName} ${disabled ? 'opacity-60' : ''}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
