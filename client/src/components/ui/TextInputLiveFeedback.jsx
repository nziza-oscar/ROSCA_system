import { useField } from "formik";
import React from "react";
const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props);
  
    // Show inline feedback if EITHER
    // - the input is focused AND value is longer than 2 characters
    // - or, the has been visited (touched === true)
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = false;

      // (!!didFocus && field.value.trim().length > 2) || meta.touched;
  
    return (
      <div
        className={`form-control ${
          showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
        }`}
      >
        <div className="flex items-center space-between">
          <label htmlFor={props.id}>{label}</label>{' '}
          {showFeedback ? (
            <div
              id={`${props.id}-feedback`}
              aria-live="polite"
              className="feedback text-sm"
            >
              {meta.error ? meta.error : '✓'}
            </div>
          ) : null}
        </div>
        <input
          {...props}
          {...field}
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          onFocus={handleFocus}
        />
        <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
          {helpText}
        </div>
      </div>
    );
  };

  export default TextInputLiveFeedback;