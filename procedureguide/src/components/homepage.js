import React, { useState } from 'react';
import proceduresData from '../components/procedures.json'; // Adjust path as needed

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchClick = () => {
        // Filter procedures based on search term
        const filteredResults = proceduresData.filter(procedure =>
            procedure.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Extract id and instructions only from filtered results
        const resultsToDisplay = filteredResults.map(procedure => ({
            id: procedure.id,
            instructions: procedure.instructions,
            supplies: procedure.supplies,
            images: procedure.images,
            name: procedure.name,
            fullImage: procedure.fullImage
        }));

        // Update state with filtered and extracted results
        setSearchResults(resultsToDisplay);
    };

    return (
        <div className='mx-20 md:mx-30 lg:mx-40'>
            <div className="mt-32">
                <div className="font-bold text-center text-lg lg:text-5xl">Clinical Procedure Lookup</div>
                <div className="input-group mt-20">
                    <input
                        type="search"
                        className="border-1 form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        data-mdb-ripple-init
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Render search results */}
            {searchResults.length > 0 && (
                <div className="mt-20 ">
                    {searchResults.map(result => (
                        <div key={result.id}>
                            
                                <p className='text-4xl font-bold'>{result.name}</p>
                          
                            <p className='mt-8'>Instructions: {result.instructions}</p>



                            <div className="mt-6">
                                {/* If there is an object with array present then it will show this code if not it won't show */}
                                {result.supplies && result.supplies.length > 0 && (
                                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                                        {/* Iterate over supplies */}
                                        {result.supplies.map((item, index) => (
                                            <div key={index} className="card">
                                                {/* Check if there is a corresponding image */}
                                                {result.images && result.images[index] && (
                                                    <div className="relative">
                                                        <img
                                                            src={result.images[index]}
                                                            className="card-img-top object-contain h-64 w-full"
                                                            alt={`Image for ${item}`}
                                                        />
                                                    </div>
                                                )}
                                                <div className="card-body border-2 flex justify-center py-2">
                                                    <p className="card-text lg:text-sm">{item}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <img src={result.fullImage} class="img-fluid w-80 h-80 flex justify-between" alt="..."></img>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Homepage;
