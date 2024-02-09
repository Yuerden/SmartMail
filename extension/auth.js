export function getAuthToken() {
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError) {
      // Directly log the lastError object to the console
      console.error('Authentication failed:', chrome.runtime.lastError);
      // You can also stringify the object to inspect its properties
      console.error('Authentication failed (stringified):', JSON.stringify(chrome.runtime.lastError, null, 2));
      // Alert the stringified error message
      alert('Authentication failed: ' + JSON.stringify(chrome.runtime.lastError, null, 2));
    } else if (token) {
      // The token is valid, use it to make your API calls
      console.log('Obtained token:', token);
      // Proceed with using the token
    } else {
      // No token was obtained, and there was no error, which is unusual
      console.error('The OAuth Token was undefined, and there was no lastError.');
    }
  });
}
