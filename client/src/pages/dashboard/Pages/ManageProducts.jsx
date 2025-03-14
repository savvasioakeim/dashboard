import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";




export default function ManageProducts() {


    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [size, setSize] = useState("")
    const [colorName, setColorName] = useState("")
    const [rgb, setRgb] = useState("")
    const [attributes, setAttributes] = useState({
        brands: [],
        categories: [],
        types: [],
        sizes: [],
        colors: [],
    });
    const [categoryType, setCategoryType] = useState("")

    function handleBrandChanges(e) {
        setBrand(e.target.value)
    }
    function handleCategoryChanges(e) {
        setCategory(e.target.value)
    }
    function handleTypeChanges(e) {
        setType(e.target.value)
    }

    function handleSizeChanges(e) {
        setSize(e.target.value)
    }
    function handleColorNameChanges(e) {
        setColorName(e.target.value)
    }
    function handleRgbChanges(e) {
        setRgb(e.target.value)
    }
    function handleTypeCategoryChanges(e) {
        setCategoryType(e.target.value);

    }

    const resetAttribute = (endpoint) => {
        switch (endpoint) {
            case "brands":
                setBrand("");
                break;
            case "categories":
                setCategory("");
                break;
            case "types":
                setType("");
                break;
            case "sizes":
                setSize("");
                break;
            case "colors":
                setColorName("");
                setRgb("");
                break;
            default:
                break;
        }
    };

    const addAttribute = async (endpoint, data) => {
        if (!data) return;

        try {
            // Check for 'colors' endpoint and send the full object (name, rgb, hex)
            const requestData = endpoint === 'colors' ? {
                name: data.name,  // The color name, e.g. 'Purple'
                rgb: data.rgb,    // The RGB value, e.g. 'rgb(128, 0, 128)'
                hex: data.hex     // The Hex value, e.g. '#800080'
            } : endpoint === 'types' ? {
                name: data.name,
                category: data.category ? attributes.categories.find(cat => cat.name === data.category)._id : null  // Use category ObjectId
            } : { name: data };  // For other attributes (brands, categories, sizes), just send the name as a string

            const response = await fetch(`http://localhost:3000/api/product-attributes/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
                credentials: "include",
            });

            if (response.ok) {
                setAttributes(prevState => {
                    // Check if the data already exists in the array before adding it
                    const isAttributeExist = prevState[endpoint].some(item => item.name === data.name || item === data);

                    // Only add the new attribute if it doesn't already exist
                    if (!isAttributeExist) {
                        return {
                            ...prevState,
                            [endpoint]: [...prevState[endpoint], requestData],
                        };
                    } else {
                        return prevState; // Return the state unchanged if the attribute already exists
                    }
                });

                resetAttribute(endpoint); // Reset the input field after adding
            } else {
                const errorData = await response.json();
                console.error("Failed to add attribute:", errorData.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error during fetch:", error.message);
        }
    };
    const fetchAttributes = async () => {
        try {
            // Fetch attributes from backend
            const brandsResponse = await fetch('http://localhost:3000/api/product-attributes/brands');
            const categoriesResponse = await fetch('http://localhost:3000/api/product-attributes/categories');
            const colorsResponse = await fetch('http://localhost:3000/api/product-attributes/colors');
            const sizesResponse = await fetch('http://localhost:3000/api/product-attributes/sizes');
            const typesResponse = await fetch('http://localhost:3000/api/product-attributes/types');

            // Check if each response is successful
            if (brandsResponse.ok && categoriesResponse.ok && colorsResponse.ok && sizesResponse.ok && typesResponse.ok) {
                // Parse JSON for each valid response
                const brandsData = await brandsResponse.json();
                const categoriesData = await categoriesResponse.json();
                const colorsData = await colorsResponse.json();
                const sizesData = await sizesResponse.json();
                const typesData = await typesResponse.json();

                // Set state with the fetched attributes
                setAttributes({
                    brands: brandsData,
                    categories: categoriesData,
                    colors: colorsData,
                    sizes: sizesData,
                    types: typesData,
                });

            } else {
                const errorText = await brandsResponse.text(); // Get the raw response text
                console.error("Failed to fetch attributes:", errorText); // Log the raw response text
                throw new Error(`Failed to fetch attributes: ${errorText}`);
            }
        } catch (err) {
            console.error("Error fetching attributes:", err.message);
            alert(`Failed to fetch attributes: ${err.message}`);
        }
    };
    const deleteAttribute = async (endpoint, id) => {
        // Show a confirmation dialog before proceeding with deletion
        const confirmDeletion = window.confirm("Are you sure you want to delete this attribute?");

        if (!confirmDeletion) {
            return; // If the user cancels the deletion, exit the function
        }

        try {
            console.log(id);
            const response = await fetch(`http://localhost:3000/api/product-attributes/${endpoint}/${id}`, {
                method: 'DELETE',
                credentials: "include",
            });

            if (response.ok) {
                setAttributes(prevState => {
                    return {
                        ...prevState,
                        [endpoint]: prevState[endpoint].filter(item => item._id !== id)
                    };
                });
            } else {
                const errorData = await response.json();
                console.error("Failed to delete attribute:", errorData.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error during fetch:", error.message);
        }
    };


    useEffect(() => {
        fetchAttributes();

    }, []);
    useEffect(() => {
        if (attributes.categories.length > 0) {
            setCategoryType(attributes.categories[0].name);
        }
    }, [attributes.categories]);




    function displayColors(arg) {
        if (!arg || arg.length === 0) {
            return <span>No colors available</span>;
        }

        return arg.map((e, index) => (
            <span key={index} className='flex items-center gap-1 hover:text-red-600 cursor-pointer'>
                <FaRegTrashAlt onClick={() => deleteAttribute("colors", e._id)} />
                <span className='flex items-center gap-1'>
                    <span style={{ backgroundColor: `${e.rgb}` }} className='rounded-full w-4 h-4'></span>
                    {e.name}
                </span>
            </span>
        ));
    }



    const displayTypes = () => {
        // Grouping types by category
        const groupedTypes = attributes.types.reduce((acc, type) => {
            const category = attributes.categories.find(
                (cat) => cat._id === type.category
            );

            if (category) {
                // Initialize category group if it doesn't exist
                if (!acc[category.name]) {
                    acc[category.name] = [];
                }
                acc[category.name].push(type);
            }
            return acc;
        }, {});

        return (
            <div>
                {Object.keys(groupedTypes).length === 0 ? (
                    <p>No types available</p>
                ) : (
                    Object.keys(groupedTypes).map((categoryName, index) => (
                        <div key={categoryName} className='flex flex-col mb-2'>
                            <h3>{categoryName}</h3>
                            <div key={index} className='flex flex-wrap gap-5'>
                                {groupedTypes[categoryName].map((type, index) => (
                                    <span key={index} className='flex items-center gap-1'><FaRegTrashAlt onClick={() => deleteAttribute("types", type._id)} />
                                        <span key={type._id}>{type.name}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    };



    function displayAttributes(endpoint) {
        const attributeList = attributes[endpoint];

        if (!attributeList || attributeList.length === 0) {
            return <span>No items available</span>;
        }

        return (
            <div className="flex flex-wrap gap-5">
                {attributeList.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 hover:text-red-600 cursor-pointer">
                        <FaRegTrashAlt onClick={() => deleteAttribute(endpoint, item._id)} />
                        <span>{item.name || item}</span> {/* Display the name if it exists, else display the item */}
                    </div>
                ))}
            </div>
        );
    }





    return (
        <>
            <div className='w-full h-screen bg-slate-200 flex justify-center items-center overflow-auto '>

                <div className='w-fit bg-white rounded p-8 flex  gap-6 flex flex-col overflow-auto mt-4' >
                    <h1 className='text-2xl ml-4'>Manage products</h1>
                    <div className='flex gap-6'>


                        <div className='flex flex-col gap-5'>


                            <div className='flex gap-3 flex-col border p-3 justify-center w-2xl rounded'>
                                <span className='text-xl'>Brands</span>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="addBrand">Add new Brand:</label>
                                    <div className='flex items-center '>
                                        <input value={brand} onChange={handleBrandChanges} type="text" name="addBrand" id="addBrand" className="form-input-text rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" />
                                        <CiSquarePlus onClick={() => addAttribute("brands", brand)} className='text-[2.8em] cursor-pointer' />
                                    </div>


                                </div>
                                <hr />
                                <div className='flex gap-5 '>
                                    {displayAttributes("brands")}


                                </div>

                            </div>

                            <div className='flex gap-3 flex-col border p-3 justify-center w-2xl rounded'>
                                <span className='text-xl'>Categories</span>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="addCategory">Add new Category:</label>
                                    <div className='flex items-center'>
                                        <input value={category} onChange={handleCategoryChanges} type="text" name="addCategory" id="addCategory" className="form-input-text rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" />
                                        <CiSquarePlus onClick={() => addAttribute("categories", category)} className='text-[2.8em] cursor-pointer' />
                                    </div>


                                </div>
                                <hr />
                                <div className='flex gap-5 '>
                                    {displayAttributes("categories")}


                                </div>

                            </div>
                            <div className='flex gap-3 flex-col border p-3 justify-center w-2xl rounded'>
                                <span className='text-xl'>Types</span>
                                <div className='flex gap-2 flex-col'>
                                    <span >Add new Type:</span>
                                    <div className='flex gap-2'>
                                        <label htmlFor="categoryType">Category Type</label>
                                        <select onChange={handleTypeCategoryChanges} className='w-fit border rounded' value={categoryType} name="categoryType" id="categoryType">
                                            {attributes.categories.length > 0 ? (
                                                attributes.categories.map((category, index) => (
                                                    <option key={index} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="">No categories available</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className='flex  flex-col gap-2'>
                                        <label htmlFor="types">Type</label>
                                        <div className='flex items-center'>
                                            <input value={type} onChange={handleTypeChanges} type="text" name="types" id="types" className="form-input-text rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" />
                                            <CiSquarePlus onClick={() => addAttribute("types", { name: type, category: categoryType })} className='text-[2.8em] cursor-pointer' />
                                        </div>

                                    </div>


                                </div>
                                <hr />
                                <div className='flex gap-5 '>
                                    {displayTypes(attributes.types)}


                                </div>

                            </div>

                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='flex gap-3 flex-col border p-3 justify-center w-2xl rounded'>
                                <span className='text-xl'>Sizes</span>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="sizes">Add new Size:</label>
                                    <div className='flex items-center'>
                                        <input value={size} onChange={handleSizeChanges} type="text" name="sizes" id="sizes" className="form-input-text rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" />
                                        <CiSquarePlus onClick={() => addAttribute("sizes", size)} className='text-[2.8em] cursor-pointer' />
                                    </div>


                                </div>
                                <hr />
                                <div className='flex gap-5 '>
                                    {displayAttributes("sizes")}


                                </div>

                            </div>
                            <div className='flex gap-3 flex-col border p-3 justify-center w-2xl rounded'>
                                <span className='text-xl'>Colors</span>
                                <div className='flex gap-2 flex-col w-fit'>
                                    <span>Add new Color:</span>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="colorName">Color Name</label>
                                        <input value={colorName} onChange={handleColorNameChanges} type="text" name="colorName" id="colorName" className="form-input-text rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" />

                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="rgb">RGB</label>
                                        <div className='flex items-center'>
                                            <input value={rgb} onChange={handleRgbChanges} type="text" name="rgb" id="rgb" className="form-input-text rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" />

                                            <CiSquarePlus onClick={() => addAttribute("colors", { name: colorName, rgb: rgb })} className='text-[2.8em] cursor-pointer' />
                                        </div>

                                    </div>


                                </div>
                                <hr />
                                <div className='flex gap-5 '>
                                    {displayColors(attributes.colors)}


                                </div>

                            </div>
                        </div>
                    </div>

                </div >




            </div >


        </>
    )

}
