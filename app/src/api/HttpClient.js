async function processJSONResponse(response) {
  if (!response.ok) {
    let errorMessage = `Request failed: ${response.status} ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData?.error) errorMessage = errorData.error;
    } catch {
      // Keep the status-based message when the error response is not JSON.
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return undefined;
  return response.json();
}

function handleError(error) {
  console.error("Error in HTTP request", error);
  throw error;
}

const HttpClient = {
  async get(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      return await processJSONResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};

export default HttpClient;
