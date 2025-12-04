import { useState, useEffect } from 'react';
import FilterCafes from './FilterCafes';

const CafesTable = () => {
    const [cafes, setCafes] = useState([]);
    const [filteredCafes, setFilteredCafes] = useState([]);

    useEffect(() => {
        fetch('/cafes')
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.cafes)) {
                    setCafes(data.cafes);
                    setFilteredCafes(data.cafes);
                } else {
                    console.error('Fetched data does not contain an array in cafes property:', data);
                    setCafes([]);
                    setFilteredCafes([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching cafes:', error);
                setCafes([]);
                setFilteredCafes([]);
            });
    }, []);

    const handleFilterChange = (selectedSubway) => {
        if (selectedSubway === 'All') {
            setFilteredCafes(cafes);
        } else {
            setFilteredCafes(cafes.filter(cafe => cafe.subwayCode === selectedSubway));
        }
    };

    return (
        <div className='cafesTable'>
            <FilterCafes onFilterChange={handleFilterChange} />
            <ul className="cardsList">
                {filteredCafes.map((cafe) => {
                    const subwayOptions = [
                        { name: "Арбатская", code: "Arbat" },
                        { name: "Александровский сад", code: "Alexanders Garden" },
                        { name: "Московская", code: "Moscow" },
                        { name: "Парк Культуры", code: "Culture" },
                        { name: "Театральная", code: "Theater" },
                    ];
                    const subwayName = subwayOptions.find(option => option.code === cafe.subwayCode)?.name || cafe.subwayCode;
                    return (
                        <li key={cafe.id} className="card">
                            <img src={cafe.img || 'https://via.placeholder.com/150'} alt={cafe.name} />
                            <h2>{cafe.name}</h2>
                            <p>{cafe.desc}</p>
                            <p>{cafe.address}</p>
                            <p>Subway: {subwayName}</p>
                            <p>{cafe.workTime}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CafesTable;
