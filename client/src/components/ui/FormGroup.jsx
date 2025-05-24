
/**
 * FormGroup component to group form elements with consistent spacing
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.className - Additional CSS classes
 */


const FormGroup = ({ children, className = '' }) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {children}
      </div>
    );
  };
  
  export default FormGroup;
  