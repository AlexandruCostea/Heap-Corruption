import { BarChart } from "@mui/x-charts";
import {useContext} from "react";
import {PostsContext} from "../App";


const MostUpvotesChart = () => {
    const {postList, _ } = useContext(PostsContext);
    let userUpvotes = {};
    postList.forEach(post => {
        if (userUpvotes[post.username]) {
            userUpvotes[post.username] += post.upvotes;
        } else {
            userUpvotes[post.username] = post.upvotes;
        }
    });

    let topFiveUsers = Object.entries(userUpvotes).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return (
        <BarChart
            series={[
                { 
                    data: topFiveUsers.map(user => user[1]),
                    color: '#3f51b5'
                }
            ]}
            height={400}
            xAxis={[{ data: topFiveUsers.map(user => user[0]), scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
    )
}

export default MostUpvotesChart