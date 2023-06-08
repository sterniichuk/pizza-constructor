import React, { useState, useEffect } from 'react';


function getNumber(number: number): Promise<number> {
    const url = `http://localhost:8080/api/v1/cart/number?number=${number}`;

    return fetch(url, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to get number for " + number);
            }
            return response.text();
        })
        .then(data => {
            return parseInt(data);
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
}

const MyComponent = () => {
    const [elementValue, setElementValue] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNumber(elementValue);
                const data = await response;
                if (data === 0) {
                    return;
                }
                setElementValue(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const interval = setInterval(fetchData, 5000);
        return () => {
            // Clean up the interval when the component unmounts
            clearInterval(interval);
        };
    }, [elementValue]);

    return <h1>{elementValue}</h1>;
};

export default MyComponent;
