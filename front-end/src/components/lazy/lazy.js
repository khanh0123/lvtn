import React, {lazy, Suspense} from 'react';

const Lazy = ({comp}) => {    
    // const OtherComponent = lazy(() => import("../home"));
    // console.log(() => import("../home"));
    
    const OtherComponent = lazy(() => comp);

    return (
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent/>
        </Suspense>
      );
}
export default Lazy;