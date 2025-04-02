const request = async (method, url, data, options = {}) => {
    if (method !== 'GET') {
        options.method = method;
    }

    if (data) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        }
    }

    const response = await fetch(url, options);
    
    // Handle error responses
    if (!response.ok) {
        let errorMessage;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || 'An error occurred';
        } catch {
            errorMessage = response.statusText || `HTTP error! status: ${response.status}`;
        }
        throw new Error(errorMessage);
    }

    // For successful responses
    try {
        return await response.json();
    } catch {
        return null; // Return null for non-JSON responses
    }
}

export default {
    get: request.bind(null, 'GET'),
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    delete: request.bind(null, 'DELETE'),
}