export class HytaleClient {
    /**
     * @param {Object} options
     * @param {string} [options.baseUrl] - The base URL for the Hytale API.
     */
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || 'https://hytale.com/api';
    }

    /**
     * Helper method to perform requests.
     * @param {string} endpoint
     * @returns {Promise<any>}
     */
    async _request(endpoint) {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Hytale API Error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get published blog posts.
     * @returns {Promise<Array>}
     */
    async getPublishedPosts() {
        return this._request('/blog/post/published');
    }

    /**
     * Get a blog post by its slug.
     * @param {string} slug
     * @returns {Promise<Object>}
     */
    async getPostBySlug(slug) {
        if (!slug) throw new Error('Slug is required');
        return this._request(`/blog/post/slug/${slug}`);
    }

    /**
     * Get archived blog posts by year and month.
     * @param {string|number} year
     * @param {string|number} month
     * @returns {Promise<Array>}
     */
    async getArchivedPosts(year, month) {
        if (!year || !month) throw new Error('Year and month are required');
        return this._request(`/blog/post/archive/${year}/${month}`);
    }
}
