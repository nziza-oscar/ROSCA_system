
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6 text-center text-red-600">
        <h1 className="text-2xl font-bold">Oops! Error {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-center text-red-600">
      <h1 className="text-2xl font-bold">Unexpected Error</h1>
      <p>{error.message || 'Something went wrong.'}</p>
    </div>
  );
}
