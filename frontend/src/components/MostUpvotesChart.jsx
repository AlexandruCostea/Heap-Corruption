import { BarChart } from "@mui/x-charts";
import {useContext} from "react";
import {AppContext} from "../App";


const MostUpvotesChart = () => {
    const {postList, userList } = useContext(AppContext);
    let userUpvotes = {};
    postList.forEach(post => {
        if (userUpvotes[post.userId]) {
            userUpvotes[post.userId] += post.upvotes;
        } else {
            userUpvotes[post.userId] = post.upvotes;
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
            xAxis={[{ data: topFiveUsers.map(user => userList.find(u => u.id === parseInt(user[0])).username), scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
    )
}

export default MostUpvotesChart