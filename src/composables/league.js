import {BASE_URL} from '../config';

export const createLeague = async (leagueDetails) => {

    const response = await fetch(`${BASE_URL}/api/league`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(leagueDetails)
    });

    const data = await response.json();

    if (response.status === 200) {
        
        alert("League created successfully");
    }

    else {
        alert("Error creating league");
    }

};

export const getMyLeagues = async () => {

    const response = await fetch(`${BASE_URL}/api/player-league`, {
        method: "GET",
        credentials: "include",
        headers: { 
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (response.status === 200) {
        
        return data;
    }

    else {
        return null;
    }

}
