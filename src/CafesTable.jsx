import { useState, useEffect } from 'react';
import FilterCafes from './FilterCafes';

const CafesTable = () => {
    const [cafes, setCafes] = useState([]);

    useEffect(() => {
        fetch('/cafes')
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.cafes)) {
                    setCafes(data.cafes);
                } else {
                    console.error('Fetched data does not contain an array in cafes property:', data);
                    setCafes([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching cafes:', error);
                setCafes([]);
            });
    }, []);

    return (
        <div className='cafesTable'>
            <FilterCafes />
            <ul className="cardsList">
                {cafes.map((cafe) => (
                    <li key={cafe.id} className="card">
                        <img src={cafe.image || 'https://via.placeholder.com/150'} alt={cafe.name} />
                        <h2>{cafe.name}</h2>
                        <p>{cafe.description}</p>
                        <p>{cafe.address}</p>
                        <p>Subway: {cafe.subway}</p>
                        <p>{cafe.hours}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CafesTable;
