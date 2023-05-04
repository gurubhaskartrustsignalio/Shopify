import React, { useEffect, useState } from 'react';


export default function Covid() {

    const [data, setdata] = useState([]);
    const [counter, setCounter] = useState(0);

    //increase counter
    const increase = () => {
        getdata()
        setCounter(count => count + 1);
        
    };

    //decrease counter
    const decrease = () => {
        if (counter > 0)
            setCounter(count => count - 1);
            getdata()
    };

    //reset counter 
    const reset = () => {
        getdata();
        setCounter(0)
        
    }
    const getdata = async () => {
        try {
            // const res = await fetch('https://data.covid19india.org/data.json');
            const res = await fetch('https://dev-api.trustsignal.io/v1/accounts/templates?api_key=205c75ee-12f3-4b0b-963d-8e528556f8c7');

            const Fdata = await res.json();
            console.log(Fdata);
            setdata(Fdata.statewise[counter]);
            console.log(counter)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getdata();
    }, []);
    return (
        <>
            <ul>
                <li>
                    <div>
                        <p>Active Cases {data.active}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>Last updated {data.lastupdatedtime}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>recovered {data.recovered}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>confirmed {data.confirmed}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>state {data.state}</p>
                    </div>
                </li>
                <span className="counter__output">{counter}</span>
                <div className="btn__container">
                    <button className="control__btn" onClick={increase}>+</button>
                    <button className="control__btn" onClick={decrease}>-</button>
                    <button className="reset" onClick={reset}>Reset</button>
                </div>
            </ul>
        </>
    );
}

