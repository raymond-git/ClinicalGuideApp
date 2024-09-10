import React, { useState } from 'react';
import proceduresData from '../components/procedures.json'; // Adjust path as needed
import Navbar from "./navbar";
import Footer from "./footer";

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
                procedure.name.toLowerCase().includes(query.toLowerCase())
            );

            const resultsToDisplay = filteredResults.map(procedure => ({
                procedureId: procedure.id,
                procedureName: procedure.name,
                procedureInstructions: procedure.instructions,
                procedureSubNames: procedure.subnames,
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

    return (
        <div>
            <Navbar />
            <div className='mx-10 lg:mx-60 xl:mx-96 my-12'>
                <div className="mt-32">
                    <div className="font-serif font-bold text-center text-xl lg:text-4xl">Clinical Procedure Lookup</div>
                    {/* <p className='font-serif text-center text-xl mt-8'>Search for medical procedures, view required items, and access step-by-step instructions with images.</p> */}
                    <p className='lg:text-xl text-rose-600 font-bold text-center mt-8'>
                        Testing Phase! Please either copy and paste the procedures listed below or enter them into the search bar for results.
                    </p>
                    <p className='mt-8'>
                        A1C, Endocervical Female GC/CT Test, ER, Group B Step (GBS) Swab Tray, Hemoglobin, Male Urethral Swab GC/CT Test, PAP - Thin Prep Set, Plantar Wart Tray Set Up, Rectal Exam Tray Set Up, Stool C. diff, Stool Culture, Stool O&P, Throat or Rectal GC/CT Test, Urine GC/CT for Quest
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
                        <p className='text-xl lg:text-4xl font-bold mb-4'>{selectedItem.procedureName}</p>

                        {/* Conditionally render based on the presence of an image */}
                        {selectedItem.procedureImageUrls ? (
                            <div>
                                <img
                                    className='object-fit '
                                    src={selectedItem.procedureImageUrls}
                                    alt={selectedItem.procedureName}
                                />
                                <ul className='content-center fancy-list text-base lg:text-2xl mt-4 list-decimal pl-4'>
                                    {selectedItem.procedureInstructions.map((bullet, index) => (
                                        <li key={index}>{bullet}</li>
                                    ))}
                                </ul>
                                <p className='font-serif text-base lg:text-xl mt-12'>{selectedItem.procedureSpecialInstructions}</p>
                            </div>
                        ) : (
                            <div>
                                {/* Loop through subnames and render instructions if no image */}
                                {selectedItem.procedureSubNames && selectedItem.procedureSubNames.length > 0 ? (
                                    selectedItem.procedureSubNames.map((subnameItem, index) => (
                                        <div key={index} className="mb-12">
                                            <h2 className='text-base lg:text-xl font-semibold mb-4'>{subnameItem.subname}</h2>
                                            {/* <ul className='content-center fancy-list text-xl mt-4 list-decimal pl-4'> */}
                                            <ul className='text-sm lg:text-lg list-decimal pl-4'>
                                                {subnameItem.instructions.map((bullet, bulletIndex) => (
                                                    <li key={bulletIndex}>{bullet}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <p>Not available yet hehehehehe:) Work in progress!</p>
                                )}
                                <p className='font-serif text-xl mt-12'>{selectedItem.procedureSpecialInstructions}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Homepage;
