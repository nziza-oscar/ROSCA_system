
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import ErrorImg from "../assets/error.png"
export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6 text-center text-red-600">
        <img src={ErrorImg} alt='Error' />
        <h1 className="text-2xl font-bold">Oops! Error {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );

  }

  console.log(error)

  return (
   <div className="flex h-screen items-center justify-center">
     <div className="p-6 text-center text-red-600 grid grid-cols-2 max-w-4xl items-center">
      
      <div>
        <img src={ErrorImg} alt='Error' className='w-64'/>
      </div>
      <div>
           <h1 className="text-2xl font-bold">505 Page Broken</h1>
          <p>{'Something went wrong.'}</p>
      </div>
   
    </div>
   </div>
  );
}
