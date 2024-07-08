import React, { useEffect } from 'react'
import Privacy from './Privacy';

const CancellationPolicy = () => {

  useEffect(() => {
    // Check if the current route is the privacy policy route
    if (location.pathname === "/cureO/cancellation-policy") {
        // Scroll to the privacy policy div
        const privacyPolicyDiv =
            document.getElementById("cancellationPolicy");
        if (privacyPolicyDiv) {
            privacyPolicyDiv.scrollIntoView({ behavior: "smooth" });
        }
    }
}, [location.pathname]);
  return (
    <div className="space-y-2 p-4">
      <Privacy/>
    </div>
  )
}

export default CancellationPolicy;