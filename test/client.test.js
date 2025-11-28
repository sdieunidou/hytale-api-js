import { test, describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { HytaleClient } from '../src/client.js';

describe('HytaleClient', () => {
    it('should be instantiated with default base URL', () => {
        const client = new HytaleClient();
        assert.strictEqual(client.baseUrl, 'https://hytale.com/api');
    });

    it('should allow overriding base URL', () => {
        const client = new HytaleClient({ baseUrl: 'https://api.example.com' });
        assert.strictEqual(client.baseUrl, 'https://api.example.com');
    });

    it('should fetch published posts', async () => {
        const mockFetch = mock.method(global, 'fetch', async () => {
            return {
                ok: true,
                json: async () => [{ title: 'Test Post', slug: 'test-post' }]
            };
        });

        const client = new HytaleClient();
        const posts = await client.getPublishedPosts();

        assert.strictEqual(posts.length, 1);
        assert.strictEqual(posts[0].title, 'Test Post');
        assert.strictEqual(mockFetch.mock.calls.length, 1);
        assert.strictEqual(mockFetch.mock.calls[0].arguments[0], 'https://hytale.com/api/blog/post/published');

        mockFetch.mock.restore();
    });

    it('should fetch post by slug', async () => {
        const mockFetch = mock.method(global, 'fetch', async () => {
            return {
                ok: true,
                json: async () => ({ title: 'Test Post', slug: 'test-post' })
            };
        });

        const client = new HytaleClient();
        const post = await client.getPostBySlug('test-post');

        assert.strictEqual(post.title, 'Test Post');
        assert.strictEqual(mockFetch.mock.calls.length, 1);
        assert.strictEqual(mockFetch.mock.calls[0].arguments[0], 'https://hytale.com/api/blog/post/slug/test-post');

        mockFetch.mock.restore();
    });

    it('should throw error when fetch fails', async () => {
        const mockFetch = mock.method(global, 'fetch', async () => {
            return {
                ok: false,
                status: 404,
                statusText: 'Not Found'
            };
        });

        const client = new HytaleClient();

        await assert.rejects(
            async () => await client.getPublishedPosts(),
            {
                message: 'Hytale API Error: 404 Not Found'
            }
        );

        mockFetch.mock.restore();
    });
});
