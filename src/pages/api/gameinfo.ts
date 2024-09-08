import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req:NextApiRequest, res:NextApiResponse
) {
    const {title, getting} = req.body;
    try{
        let response = await fetch("https://id.twitch.tv/oauth2/token", {
            method: "POST",
            body: new URLSearchParams({
                client_id: `${process.env.TWITCH_CLIENT_ID}`,
                client_secret: `${process.env.TWITCH_CLIENT_SECRET}`,
                grant_type: 'client_credentials',
            }),
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
              }
        });
        if(response.status!=200) return res.status(500).end();
        const token = await response.json();
        if(getting == 'image'){
            let response = await fetch("https://api.igdb.com/v4/games", {
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    'Client-ID': `${process.env.TWITCH_CLIENT_ID}`,
                    'Authorization': `Bearer ${token.access_token}`,
                },
                body: 'search "'+title+'"; fields cover.*; limit 1;'
            });
            if(response.status!=200) return res.status(500).end();
            const returnCover = await response.json();
            return res.status(200).json(returnCover[0].cover.image_id);
        }
        return res.status(500).end();
    } catch(error){
        console.error('Error in API:', error);
        return res.status(500).json({message:'An error occured with the igdb API.', error: error});
    }
}