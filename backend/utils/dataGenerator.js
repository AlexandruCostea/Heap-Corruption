import faker from 'faker';
import postsData from '../model/data.js';

const list = postsData;


const dataGenerator = (nrEntities) => {
    for (let i = 0; i < nrEntities; i++) {

        const pastDate = faker.date.past();
        const year = pastDate.getFullYear();
        const month = String(pastDate.getMonth() + 1).padStart(2, '0');
        const day = String(pastDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const post = {
            id: list.length > 0 ? Math.max(...list.map(post => post.id)) + 1 : 1,
            username: faker.name.findName(),
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            upvotes: faker.datatype.number(),
            date: formattedDate
        }
        list.push(post);
    }
}

export default dataGenerator;