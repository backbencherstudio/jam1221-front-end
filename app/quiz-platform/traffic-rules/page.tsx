
"use client";


import { useAuth } from '@/app/_components/AuthProviderContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loading from '../loading';


const TrafficRulesPage = () => {

    const route = useRouter()
    // const { isAuthenticated } = useAuth();
    
    // useEffect(() => {
        //     if (isAuthenticated === false) {
            //         route.replace("/login"); // or wherever you want to send authenticated users
            //     }
            // }, [isAuthenticated]);
            
            const { isAuthenticated } = useAuth();
            console.log(isAuthenticated)
            
            if(isAuthenticated === (false || null)){
                return <Loading />
            }
    
        useEffect(() => {
            console.log("isAuthenticated:", isAuthenticated);
            if (isAuthenticated === (false || null)) {
                route.replace("/login");
            }
        }, [isAuthenticated]);


    return (
        <div>
            <h1>Traffic Rules question</h1>
        </div>
    );
};

export default TrafficRulesPage;