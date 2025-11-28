import { HytaleClient } from './client.js';

const client = new HytaleClient();

console.log('Fetching published posts...');
try {
    const posts = await client.getPublishedPosts();
    console.log(`Found ${posts.length} published posts.`);
    if (posts.length > 0) {
        console.log('Most recent post:', posts[0].title);

        const slug = posts[0].slug;
        console.log(`\nFetching details for post slug: ${slug}...`);
        const postDetails = await client.getPostBySlug(slug);
        console.log('Post details retrieved:', postDetails.title);
    }
} catch (error) {
    console.error('Error:', error.message);
}
