const faker = require('faker');
const config = require('../config');
const { Client } = require('pg');

const dataGenerator = async (nrEntities) => {
    const client = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
    });
    client.connect();
    try {
        const userIdsQuery = 'SELECT id FROM users';
        const ids = await client.query(userIdsQuery);
        const userIds = ids.rows;

        for (let i = 0; i < nrEntities; i++) {

            const pastDate = faker.date.past();
            const year = pastDate.getFullYear();
            const month = String(pastDate.getMonth() + 1).padStart(2, '0');
            const day = String(pastDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const userId = faker.random.arrayElement(userIds).id;
            const post = {
                userId: userId,
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                upvotes: faker.datatype.number(),
                datePosted: formattedDate
            }
            try {
                const query = 'INSERT INTO posts (user_id, title, description, upvotes, date_posted) VALUES ($1, $2, $3, $4, $5)';
                const values = [post.userId, post.title, post.description, post.upvotes, post.datePosted];
                await client.query(query, values);
            } catch (err) {
                console.error('Error inserting post:', err);
            }
        }
    } catch (err) {
        console.error('Error getting user ids:', err);
    }
    client.end();
}

module.exports = dataGenerator;