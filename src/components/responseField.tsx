'use client';
import { fetchGPT } from "@/lib/http";
import { useEffect, useState } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
function reasonsListFunc(reasonsList:string[]){
    let returnList:React.JSX.Element[] = [];
    let n=reasonsList.length;
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
function resultsList(titleNames:string[], titleReasons: string, setError:Function){
    try{
        const reasonsList = JSON.parse(titleReasons);
        let returnList = [<h5 key='0' className="pt-8 p-2 text-center text-slate-300">Recommended Games</h5>];
        let currentKey=1;
        for(let i=0; i<5; i++){
            if(titleNames[i])
                returnList.push(
                    <div key={`${currentKey++}`} className="flex items-start space-x-6 p-6">
                        <img key={`${currentKey++}`} alt="" width="60" height="60" className="flex-none rounded-md bg-slate-100" />
                        <div key={`${currentKey++}`} className="min-w-0 relative flex-auto">
                            <p className="font-semibold text-slate-50 truncate pr-20" key={`${currentKey++}`}>
                                {titleNames[i]}
                            </p>
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
interface Values{
    titleName: string;
}
export default function ResponseField(){
    const [names, setNames] = useState(['']);
    const [reasons, setReasons] = useState('');
    const [error, setError] = useState('');

    return (
        <div className="w-full">
            <div>
                <Formik initialValues={{titleName:''}} onSubmit={(values:Values, {setSubmitting}:FormikHelpers<Values>)=>{
                    setTimeout(
                        (async()=>{
                            const res = await fetchGPT({prompt:values.titleName});
                            const jsonRes = JSON.parse(res?.content!);
                            let titleNames = [];
                            let titleReasons = [];
                            for(let i=0; i<5; i++){
                                titleNames.push(jsonRes.games[i].name);
                                titleReasons.push(jsonRes.games[i].reasons);
                            }
                            setNames(titleNames);
                            setReasons(JSON.stringify(titleReasons));
                            console.log(jsonRes);
                            console.log(reasons);
                            setSubmitting(false);
                        }),500);
                }}>
                    <Form className="flex flex-col justify-center items-center p-6 ">
                        <div>
                            <label htmlFor="title_name" className="block mb-2 text-s font-medium text-gray-50 text-center">Game Title</label>
                            <Field type="text" id="titleName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-96" placeholder="What's a game you really liked?" name="titleName" required />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-48 px-5 py-2.5 text-center m-1">Find Recommendations</button>
                    </Form>
                </Formik>
            </div>
            {
                names.length != 1 && 
                <ul className="divide-y divide-slate-100">
                    {resultsList(names, reasons, setError)}
                </ul>
                
            }
        </div>
        
    );
    
}