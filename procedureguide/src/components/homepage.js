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
            procedureSecondaryName: procedure.secondaryName,
            fullImageUrl: procedure.fullImage,
            videoUrl: procedure.video,
            sub: procedure.subtitle,
            sub2: procedure.subtitle2,
            sub3: procedure.subtitle3,
            sub4: procedure.subtitle4,
            subHead: procedure.subheading,
            subHead2: procedure.subheading2,
            subHead3: procedure.subheading3,
            bulletPoints: procedure.bulletPoints,
            bulletPoints2: procedure.bulletPoints2,
            bulletPoints3: procedure.bulletPoints3,
            bulletPoints4: procedure.bulletPoints4,
            bulletPoints5: procedure.bulletPoints5,
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
                            {result.instructions && result.instructions.length > 0 && (
                                <p className='mt-20 text-lg'>{result.instructions}</p>
                            )}

                            <div>
                                <p className='text-xl font-bold mt-16'>{result.sub}</p>
                                {result.bulletPoints && result.bulletPoints.length > 0 && (
                                    <ul className='mt-4' style={{ listStyleType: 'disc', paddingLeft: '3em' }}>
                                        {result.bulletPoints.map((bullet, index) => (
                                            <li key={index}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <p className='text-xl font-bold mt-16'>{result.sub2}</p>
                                {result.bulletPoints2 && result.bulletPoints2.length > 0 && (
                                    <ul className='mt-4' style={{ listStyleType: 'disc', paddingLeft: '3em' }}>
                                        {result.bulletPoints2.map((bullet, index) => (
                                            <li key={index}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <p className='text-xl font-bold mt-16'>{result.sub3}</p>
                                {result.subHead && <p className='mt-4'>{result.subHead}</p>}
                                {result.bulletPoints3 && result.bulletPoints3.length > 0 && (
                                    <ul className='mt-2' style={{ listStyleType: 'disc', paddingLeft: '3em' }}>
                                        {result.bulletPoints3.map((bullet, index) => (
                                            <li key={index}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <p className='mt-8'>{result.subHead2}</p>
                                {result.bulletPoints4 && result.bulletPoints4.length > 0 && (
                                    <ul className='mt-2' style={{ listStyleType: 'disc', paddingLeft: '3em' }}>
                                        {result.bulletPoints4.map((bullet, index) => (
                                            <li key={index}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <p className='mt-8'>{result.subHead3}</p>
                                {result.bulletPoints5 && result.bulletPoints5.length > 0 && (
                                    <ul className='mt-2' style={{ listStyleType: 'disc', paddingLeft: '3em' }}>
                                        {result.bulletPoints5.map((bullet, index) => (
                                            <li key={index}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <p className='text-xl font-bold mt-16'>{result.sub4}</p>
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
