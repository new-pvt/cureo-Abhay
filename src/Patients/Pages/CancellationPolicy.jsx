import React, { useEffect } from 'react'
import Privacy from './Privacy';

const CancellationPolicy = () => {

  useEffect(() => {
    // Check if the current route is the privacy policy route
    if (location.pathname === "/medidek/cancellation-policy") {
        // Scroll to the privacy policy div
        const privacyPolicyDiv =
            document.getElementById("cancellationPolicy");
        if (privacyPolicyDiv) {
            privacyPolicyDiv.scrollIntoView({ behavior: "smooth" });
        }
    }
}, [location.pathname]);
  return (
    <div>
      <Privacy/>
    </div>
  )
}

export default CancellationPolicy;