const request = async (method, url, data, options = {}) => {
    const headers = {
        ...(data ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
    };

    const requestOptions = {
        method: method || 'GET',
        headers,
        ...options,
    };

    if (data) {
        requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
        // Get error message from server or use default message
        const error = await response.json()
            .catch(() => ({ message: 'An error occurred' }));
            
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
};

export default {
    get: request.bind(null, 'GET'),
    // get: (...params) => request('GET', ...params)
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    delete: request.bind(null, 'DELETE'),
    baseRequest: request,
}