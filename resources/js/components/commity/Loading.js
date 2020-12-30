import React from 'react';

function Loading(){
    return(
        <div className="d-flex align-items-center mb-1">
           <strong>Loading......</strong>
           <div
            className="spinner-border text-danger ml-auto"
            role="status"
            aria-hidden="true"
           >

           </div>
        </div>
    )
}
export default Loading;