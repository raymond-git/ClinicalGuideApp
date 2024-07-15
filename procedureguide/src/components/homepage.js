import React, { useState } from 'react';
import proceduresData from '../components/procedures.json'; // Adjust path as needed

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchClick = () => {
        // Filter procedures based on search term
        const filteredResults = proceduresData.filter(procedure =>
            procedure.name.toLowerCase() === (searchTerm.toLowerCase())
        );

        // Extract id and instructions only from filtered results
        const resultsToDisplay = filteredResults.map(procedure => ({
            id: procedure.id,
            instructions: procedure.instructions,
            supplies: procedure.supplies,
            images: procedure.images,
            name: procedure.name,
            fullImage: procedure.fullImage,
            video: procedure.video
        }));

        // Update state with filtered and extracted results
        setSearchResults(resultsToDisplay);

    };

    return (
        <div className='mx-20 md:mx-30 lg:mx-40 my-12'>
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
                <div className="mt-20">
                    {searchResults.map(result => (
                        <div key={result.id}>
                            <p className='text-4xl font-bold'>{result.name}</p>
                            <p className='mt-8'>Instructions: {result.instructions}</p>
                            <div className="mt-6">
                                {result.supplies && result.supplies.length > 0 && (
                                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                                        {result.supplies.map((supply, index) => (
                                            <div key={index} className="card">
                                                <div className="relative">
                                                    {result.images && result.images[index] && (
                                                        <img key={index} src={result.images[index]} className="card-img-top object-contain h-64 w-full" alt={`Image for ${supply}`} />
                                                    )}
                                                </div>
                                                <div className="card-body border-2 flex justify-center py-2">
                                                    <p className="card-text lg:text-sm">{supply}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>


                            <div>
                                {result.video && result.video !== 0 && (
                                    <p className='mt-32 text-4xl font-bold'>Test Overview and Visual Setup Reference</p>
                                )}
                                {!result.video && (
                                    <p className='mt-32 text-4xl font-bold'></p>
                                )}
                            </div>


                            {result.video && result.video.length !== 0 && (
                                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex items-stretch gap-4'>
                                    <div className="border-3 mt-20 flex justify-center video-container">
                                        <div className="embed-responsive embed-responsive-21by9">
                                            <img className="object-fill w-full h-full embed-responsive-item" src={result.fullImage} />
                                        </div>
                                    </div>
                                    <div className="border-3 mt-20 flex justify-center video-container">
                                        <div className="embed-responsive embed-responsive-21by9">
                                            <iframe className="embed-responsive-item" title="Video Player" src={result.video} allowFullScreen />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Homepage;
