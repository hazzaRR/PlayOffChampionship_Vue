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

};

export const addMatchResult = async (matchDetails, leagueId) => {


    let matchDto = {
        player1Id: matchDetails.player1Id,
        player2Id: matchDetails.player2Id,
        player1Score: matchDetails.player1Score,
        player2Score: matchDetails.player2Score,
        winnerId: matchDetails.player1Score > matchDetails.player2Score ? matchDetails.player1Id : matchDetails.player2Id,
        leagueId: leagueId,
        matchDate: new Date().toISOString()
    }

    const response = await fetch(`${BASE_URL}/api/match/`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(matchDto)
    });

    console.log(response)

    if (response.status === 201 || response.status === 200) {
        
        return true;
    }

    else {
        return false;
    }

}