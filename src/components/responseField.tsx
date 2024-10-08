'use client';
import { fetchGPT, getImage } from "@/lib/http";
import { useEffect, useState } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Image from "next/image";
import { SyncLoader } from "react-spinners";

function reasonsListFunc(reasonsList:string[]){
    const returnList:React.JSX.Element[] = [];
    const n=reasonsList.length;
    let currentKey = 100;
    for(let i=0; i<n; i++){
        if(reasonsList[i])
        returnList.push(
            <div className="px-3 ring-1 ring-slate-700 rounded mx-1" key={`${currentKey++}`}>
                <dd className="flex items-center">
                    <p key={`${currentKey++}`}>
                        {reasonsList[i]}
                    </p>
                </dd>
                
            </div>
        )
    }
    return returnList;
}
function resultsList(titleNames:string[], titleReasons: string, images:string[], setError:Function){
    try{
        const reasonsList = JSON.parse(titleReasons);
        const returnList = [<h5 key='0' className="pt-8 p-2 text-center text-slate-300">Recommended Games</h5>];
        let currentKey=1;
        for(let i=0; i<5; i++){
            if(titleNames[i])
                returnList.push(
                    <div key={`${currentKey++}`} className="flex items-start space-x-6 p-6">
                        <Image src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${images[i]}.jpg`} key={`${currentKey++}`} alt="" width="60" height="60" className="flex-none rounded-md bg-slate-100" />
                        <div key={`${currentKey++}`} className="min-w-0 relative flex-auto">
                            <div>
                                <p className="font-semibold text-slate-50 truncate pr-5" key={`${currentKey++}`}>
                                    {titleNames[i]}
                                </p>
                                <a className="text-slate-400 text-sm truncate pr-20" href={`https://www.google.com/search?q=${titleNames[i]}`} target="_blank" rel="noopener noreferrer">
                                    Search on Google
                                </a>  
                            </div>
                            
                            <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                                {reasonsListFunc(reasonsList[i])}
                            </dl>
                        </div>
                        
                    </div>
                );
        }
        return returnList;
    }catch(error){
        setError('Error, please try again. ' + error);
    }
}
const delay = (ms:number) => new Promise(
    resolve => setTimeout(resolve, ms)
  );
interface Values{
    titleName: string;
}
export default function ResponseField(){
    const [names, setNames] = useState(['']);
    const [reasons, setReasons] = useState('');
    const [images, setImages] = useState(['']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div className="w-full max-w-5xl">
            {loading && 
                <div className='fixed w-full -translate-x-16 top-1/2 start-1/2' style={{zIndex:500}}>
                    <SyncLoader color="#ff2050" margin={6} size={30} />
                </div>
            }
            <div>
                <Formik initialValues={{titleName:''}} onSubmit={(values:Values, {setSubmitting}:FormikHelpers<Values>)=>{
                    setTimeout(
                        (async()=>{
                            setLoading(true);
                            const res = await fetchGPT({prompt:values.titleName});
                            const jsonRes = JSON.parse(res?.content!);
                            const titleNames = [];
                            const titleReasons = [];
                            const coverImages:string[] = [];
                            for(let i=0; i<5; i++){
                                titleNames.push(jsonRes.games[i].name);
                                titleReasons.push(jsonRes.games[i].reasons);
                                const coverImg = await getImage({title:titleNames[i], getting:'image'});
                                coverImages.push(coverImg.content!);
                                await delay(250);
                            }
                            setNames(titleNames);
                            setReasons(JSON.stringify(titleReasons));
                            setImages(coverImages);
                            setLoading(false);
                            setSubmitting(false);
                        }),500);
                }}>
                    <Form className="flex flex-col justify-center items-center p-6 ">
                        <div>
                            <label htmlFor="title_name" className="block mb-2 text-s font-medium text-gray-50 text-center">Game Title</label>
                            <Field type="text" id="titleName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-96 mb-3" placeholder="What's a game you really liked?" name="titleName" required />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-48 px-5 py-2.5 text-center m-1">Find Recommendations</button>
                    </Form>
                </Formik>
            </div>
            {
                names.length != 1 && 
                <ul className="divide-y divide-slate-100">
                    {resultsList(names, reasons, images, setError)}
                </ul>
            }
            {
                error !== '' && 
                <p>{error}</p>
            }
        </div>
        
    );
    
}