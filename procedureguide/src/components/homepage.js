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
            instructions: procedure.instructions
        }));

        // Update state with filtered and extracted results
        setSearchResults(resultsToDisplay);
    };

    return (
        <div>
            <div className="mt-4">
                <div className="text-center text-lg lg:text-4xl">Search for Procedure</div>
                <div className="input-group mt-4">
                    <input
                        type="search"
                        className="form-control rounded"
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
                <div className="mt-4">
                    {searchResults.map(result => (
                        <div key={result.id}>
                            <p>Instructions: {result.instructions}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Homepage;
