import {BASE_URL} from '@/config';

export const getLeagueMatchHistory = async (leagueId) => {

    const response = await fetch(`${BASE_URL}/api/match/league/${leagueId}`, {
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