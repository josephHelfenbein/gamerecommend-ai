import axios from 'axios';

export async function fetchGPT(params:{prompt:string}): Promise<{
    content:string|null,
    error?:any,
}>{
    try{
        const res = await axios.post(`/api/openai`, params);
        if(res.status !== 200) throw new Error(`${res.status} - ${res.data}`);
        if(!res) throw new Error('Invalid link to api');
        return {content:res.data};
    }
    catch(error){
        console.error(error);
        return {error, content:null};
    }
}
export async function getImage(params:{title:string, getting:string}): Promise<{
    content:string|null,
    error?:any,
}>{
    try{
        const res = await axios.post(`/api/gameinfo`, params);
        if(res.status !== 200) throw new Error(`${res.status} - ${res.data}`);
        if(!res) throw new Error('Invalid link to api');
        return {content:res.data};
    }
    catch(error){
        console.error(error);
        return {error, content:null};
    }
}