import {BASE_URL} from '../config';

export const getLeagueTable = async (leagueId) => {

    const response = await fetch(`${BASE_URL}/api/leaderboard/league/${leagueId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
        }
    });

    const data = await response.json();

    if (response.status === 200) {
        
        return data;
    }

    else {
        return null;
    }

}