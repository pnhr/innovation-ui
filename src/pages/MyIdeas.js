import React, { useEffect, useState } from 'react'
import { getData } from '../utils/serviceCalls'
import { BASE_URI } from '../config'
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { InteractionType, PopupRequest } from '@azure/msal-browser';
import { protectedResources } from "../authConfig"

const MyIdeas = () => {
    const [Ideas, setIdeas] = useState([]);

    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.apiInnovation.scopes.appuser,
    });

    useEffect(() => {
        let isCancelled = false;
        let endpoint = BASE_URI + "/api/Idea/getideas";

        execute("GET", endpoint).then((response) => {
            console.log("Response from API : ", response);
            console.log("Response from API Error : ", error);
            setIdeas(response);
        });

        console.log("useEffect called! : ");

        return () => {
            isCancelled = true;
        }
    }, [execute]);

    return (
        <div>{Ideas && Ideas.length > 0 && <div>
            <p>Ideas received!</p>
        </div>}

            {!(Ideas && Ideas.length > 0) && <div>
                <p>No Ideas Found!</p>
            </div>}
        </div>
    )
}

export default MyIdeas