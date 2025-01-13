import React, { useState } from 'react';
import proceduresData from '../components/procedures.json'; // Adjust path as needed

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

const toggleInstructions = (index) => setExpandedIndex(prev => (prev === index ? null : index));

    // Handle input change
    const handleChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query) {
            // Filter procedures based on search term
            const filteredResults = proceduresData.filter(procedure =>
                procedure.name.toLowerCase().includes(query.toLowerCase())
            );

            const resultsToDisplay = filteredResults.map(procedure => ({
                procedureId: procedure.id,
                procedureName: procedure.name,
                procedureBullet: procedure.bullet,
                procedureAbbreviation: procedure.abbreviation,
                procedureInstructions: procedure.instructions,
                procedureSubNames: procedure.subnames,
                procedureSubHeadings: procedure.subheading,
                procedureSpecialInstructions: procedure.specialInstructions,
                procedureImageUrls: procedure.fullImage,
                bulletPoints: procedure.bulletPoints,
            }));

            // Update state with filtered and extracted results
            setFilteredItems(resultsToDisplay);
        } else {
            // Clear results if search term is empty
            setFilteredItems([]);
        }
    };

    // Handle item click
    const handleItemClick = (item) => {
        setSearchTerm(item.procedureName); // Optionally, set the search term to the clicked item's name
        setSelectedItem(item); // Update selected item details
        setFilteredItems([]); // Clear the suggestions
    };


    const handleItemClickNavbar = (procedure) => {
        setSelectedItem({
            procedureId: procedure.id,
            procedureName: procedure.name,
            procedureInstructions: procedure.instructions,
            procedureSubNames: procedure.subnames,
            procedureSpecialInstructions: procedure.specialInstructions,
            procedureImageUrls: procedure.fullImage,
        });
        setFilteredItems([]); // Clear the suggestions
    }

    return (
        <div>
            <div className="flex h-screen">
                <div className="sidebar sidebar-narrow-unfoldable border-end bg-black" style={{ minHeight: '100vh' }}>
                    <div className="sidebar-header border-bottom">
                        <div className="text-white">AHS</div>
                    </div>
                    <ul className="overflow sidebar-nav flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
                        <li className="nav-title text-white">Table of Content</li>
                        {proceduresData.map(procedure => (
                            <li className="nav-item" key={procedure.id}>
                                <a
                                    className="nav-link text-white"
                                    href="#!"
                                    onClick={() => handleItemClickNavbar(procedure)} // Add this line
                                >
                                    <i className="nav-icon cil-speedometer"></i> {procedure.abbreviation}
                                </a>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className='flex-grow mx-10 lg:mx-60 xl:mx-96'>
                    <div className="mt-32">
                        <div className="font-serif font-bold text-center text-2xl lg:text-4xl">Clinical Procedure Lookup</div>
                        <p className='subheadingtitle lg:text-base text-center mt-8 italic'>Discover medical procedures with items, instructions, and images for clear guidance.</p>
                        <div className="input-group mt-20">
                            <input
                                type="search"
                                className="border-1 form-control rounded "
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="search-addon"
                                value={searchTerm}
                                onChange={handleChange}
                            />

                            {searchTerm && filteredItems.length > 0 && (
                                <ul style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#fff',
                                    margin: 0,
                                    padding: 0,
                                    listStyleType: 'none',
                                    maxHeight: '200px',
                                    overflowY: 'auto'
                                }}>
                                    {filteredItems.map((item) => (
                                        <li
                                            key={item.procedureId}
                                            onClick={() => handleItemClick(item)}
                                            style={{
                                                padding: '8px',
                                                borderBottom: '1px solid #ddd',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {item.procedureName}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Render search results */}
                    {selectedItem && (
                        <div className="mt-20">
                            <p className='text-2xl lg:text-3xl font-bold mb-4'>{selectedItem.procedureName}</p>
                            {/* Conditionally render based on the presence of an image */}
                            {selectedItem.procedureImageUrls ? (
                                <div>
                                    <img
                                        className='object-fit sm:pl-10 sm:pr-10 lg:pl-20 lg:pr-20 bg-gray-300'
                                        src={selectedItem.procedureImageUrls}
                                        alt={selectedItem.procedureName}
                                    />
                                    <ul className='content-center fancy-list text-xl lg:text-2xl mt-4 list-decimal pl-4'>
                                        {selectedItem.procedureInstructions.map((bullet, index) => (
                                            <li key={index}>{bullet}</li>
                                        ))}
                                    </ul>
                                    <p className='font-serif text-base lg:text-xl pb-12'>{selectedItem.procedureSpecialInstructions}</p>
                                </div>
                            ) : (
                                <div>
                                    {/* Loop through subnames and render instructions if no image */}
                                    {selectedItem.procedureSubNames && selectedItem.procedureSubNames.length > 0 ? (
                                        selectedItem.procedureSubNames.map((subnameItem, index) => (
                                            <div key={index} className="mb-12">
                                                <h2 className='text-base lg:text-xl font-semibold mb-4'>{subnameItem.subname}</h2>
                                                <h2 className='text-base lg:text-lg mb-4'>{subnameItem.spubheading}</h2>


                                                {/* <ul className='content-center fancy-list text-xl mt-4 list-decimal pl-4'> */}
                                                {/* <ul className='text-base lg:text-lg list-decimal pl-4'>
                                                    {subnameItem.instructions.map((bullet, bulletIndex) => (
                                                        <li key={bulletIndex}>{bullet}</li>
                                                    ))}
                                                </ul> */}


                                                 {/* <div>   
                                                    <button onClick={() => toggleInstructions(index)} className="text-blue-600 underline">
                                                        {expandedIndex === index ? 'Hide Instructions' : 'View More'}
                                                    </button>
                                                    {expandedIndex === index && (
                                                        <ul className={`text-base lg:text-lg pl-4 ${subnameItem.styleType === 'bullet' ? 'list-disc' : 'list-decimal'}`}>
                                                            {subnameItem.instructions.map((bullet, bulletIndex) => (
                                                                <li key={bulletIndex}>{bullet}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>  */}

                                                <ul className={`text-base lg:text-lg pl-4 ${subnameItem.styleType === 'bullet' ? 'list-disc' : 'list-decimal'}`}>
                                                    {subnameItem.instructions.map((bullet, bulletIndex) => (
                                                        <li key={bulletIndex}>{bullet}</li>
                                                    ))}
                                                </ul>

                                                <h2 className='text-base lg:text-lg mt-2'>{subnameItem.subheading2}</h2>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Not available yet hehehehehe:) Work in progress! Waiting for pictures to be taken</p>
                                    )}
                                    <p className='font-serif text-base lg:text-xl pb-12'>{selectedItem.procedureSpecialInstructions}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
