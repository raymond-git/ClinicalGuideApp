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

        // Extract id, name, instructions, supplies, images, full image, and video only from filtered results
        const resultsToDisplay = filteredResults.map(procedure => ({
            procedureId: procedure.id,
            instructions: procedure.instructions,
            requiredSupplies: procedure.supplies,
            imageUrls: procedure.images,
            procedureName: procedure.name,
            fullImageUrl: procedure.fullImage,
            videoUrl: procedure.video,
            sub: procedure.subtitle,
            sub2: procedure.subtitle2,
            sub3: procedure.subtitle3,
            sub4: procedure.subtitle4,
            bulletPoints: procedure.bulletPoints,
            bulletPoints2: procedure.bulletPoints2
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
                            <p className='text-4xl font-bold'>{result.procedureName}</p>
                            <p className='text-xl font-bold mt-16'>{result.sub}</p>
                            <ul className='mt-4' style={{ listStyleType: 'disc', paddingLeft: '1em' }}>
                                {result.bulletPoints.map((bullet, index) => (
                                    <li key={index}>{bullet}</li>
                                ))}
                            </ul>
                            <p className='text-xl font-bold mt-16'>{result.sub2}</p>
                            <ul className='mt-4' style={{ listStyleType: 'disc', paddingLeft: '1em' }}>
                                {result.bulletPoints2.map((bullet, index) => (
                                    <li key={index}>{bullet}</li>
                                ))}
                            </ul>

                            <p className='text-xl font-bold mt-16'>{result.sub4}</p>
                            <p className='text-xl font-bold mt-16'>{result.sub3}</p>


                            <div className="mt-6">
                                {result.requiredSupplies && result.requiredSupplies.length > 0 && (
                                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                                        {result.requiredSupplies.map((supply, index) => (
                                            <div key={index} className="card">
                                                <div className="relative">
                                                    {result.imageUrls && result.imageUrls[index] && (
                                                        <img key={index} src={result.imageUrls[index]} className="card-img-top object-cover h-64 w-full" alt={`${supply}`} />
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

                            {/* If no videos are found during the search, title will not be available */}
                            <div>
                                {result.videoUrl && result.videoUrl !== 0 && (
                                    <p className='mt-32 text-4xl font-bold'>Test Overview and Visual Setup Reference</p>
                                )}
                                {!result.videoUrl && (
                                    <p className='mt-32 text-4xl font-bold'></p>
                                )}
                            </div>


                            {result.videoUrl && result.videoUrl.length !== 0 && (
                                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex items-stretch gap-4'>
                                    <div className="border-3 mt-20 flex justify-center video-container">
                                        <div className="embed-responsive embed-responsive-21by9">
                                            <img className="object-fill w-full h-full embed-responsive-item" src={result.fullImageUrl} alt="fullImageUrl" />
                                        </div>
                                    </div>
                                    <div className="border-3 mt-20 flex justify-center video-container">
                                        <div className="embed-responsive embed-responsive-21by9">
                                            <iframe className="embed-responsive-item" title="Video Player" src={result.videoUrl} allowFullScreen />
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
