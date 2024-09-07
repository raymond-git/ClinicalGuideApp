import React, { useState } from 'react';
import proceduresData from '../components/procedures.json'; // Adjust path as needed

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query) {
            // Filter procedures based on search term
            const filteredResults = proceduresData.filter(procedure =>
                procedure.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            const resultsToDisplay = filteredResults.map(procedure => ({
                procedureId: procedure.id,
                procedureName: procedure.name,
                procedureInstructions: procedure.instructions,
                procedureSpecialInstructions: procedure.specialInstructions,
                procedureImageUrls: procedure.fullImage,
                bulletPoints: procedure.bulletPoints,
            }));

            // Update state with filtered and extracted results
            setFilteredItems(resultsToDisplay);
        } else {
            // Clear results if search term is empty when you back space
            setFilteredItems([]);
        }
    };

    // Handle item click
    const handleItemClick = (item) => {
        setSearchTerm(item.procedureName); // Optionally, set the search term to the clicked item's name
        setSelectedItem(item); // Update selected item details
        setFilteredItems([]); // Clear the suggestions
    };

    return (
        <div className='mx-20 md:mx-30 lg:mx-40 my-12'>
            <div className="mt-32">
                <div className="font-bold text-center text-lg lg:text-5xl">Clinical Procedure Lookup</div>
                <p className='text-xl text-rose-600 font-bold text-center mt-8'>
                    Testing Phase! Please type into the search bar to see suggestions and select an option below. Copying and pasting does not currently work!
                </p>
                <p className='mt-8'>
                    A1C, Endocervical Female GC/CT Test, Group B Step (GBS) Swab Tray, Hemoglobin, Male Urethral Swab GC/CT Test, PAP - Thin Prep Set, Plantar Wart Tray Set Up, Rectal Exam Tray Set Up, Stool C. diff, Stool Culture, Stool O&P, Throat or Rectal GC/CT Test, Urine GC/CT for Quest
                </p>
                <div className="input-group mt-20">
                    <input
                        type="search"
                        className="border-1 form-control rounded"
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

                            {/* Shows pop up filter words */}
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

                    {searchTerm && filteredItems.length === 0 && (
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
                            <li style={{ padding: '8px' }}>No results found</li>
                        </ul>
                    )}
                </div>
            </div>

            {/* Render search results */}
            {selectedItem && (
                <div className="mt-20">
                    <p className='text-4xl font-bold mb-4'>{selectedItem.procedureName}</p>

                    <div className='max-w-4xl'>
                        <img
                            className='object-contain h-full w-full'
                            src={selectedItem.procedureImageUrls}
                            alt={selectedItem.procedureName}
                        />
                    </div>
                    <ol className='text-xl mt-4 list-decimal pl-4'>
                        {selectedItem.procedureInstructions.map((bullet, index) => (
                            <li key={index}>{bullet}</li>
                        ))}
                    </ol>
                    <p className='text-xl mt-8'>{selectedItem.procedureSpecialInstructions}</p>
                </div>
            )}
        </div>
    );
};

export default Homepage;
