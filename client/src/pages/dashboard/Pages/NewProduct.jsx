import React, { useState } from "react";


export default function NewProduct() {


    const colors = ["red", "green", "blue", "purple"]




    return (
        <div className="w-full h-screen bg-slate-200 flex flex-col  items-center justify-center p-3">
            <div className="bg-white w-full max-w-2xl h-fit p-8 flex flex-col gap-2 rounded overflow-auto">
                <div className="mb-6">
                    <h1 className="mb-4 text-3xl ">Create new Product</h1>
                    <hr className="text-stone-400" />
                </div>

                <div className="flex flex-col gap-2">


                    <div className="flex  gap-4  items-center">
                        <div className="flex flex-col ">
                            <label htmlFor="name">Name</label>
                            <input className="form-input-text rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" type="text" name="name" id="name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price">Price</label>
                            <input className="h-[2.2em] pl-2 w-20 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" type="number" name="price" id="price" />
                        </div>

                        <div className="flex gap-2">

                            <div className="flex flex-col">
                                <label htmlFor="quanity">Quantity</label>
                                <input className="h-[2.2em] pl-2 w-20 rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" type="number" name="quantity" id="quantity" />
                            </div>

                        </div>

                    </div>
                    <div className="flex  gap-4 items-center">
                        <div>
                            <div className="flex flex-col ">
                                <label htmlFor="code">Code</label>
                                <input className="form-input-text rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" type="text" name="code" id="code" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="color" >Color</label>
                            <select id="color" name="color" className="p-2 border rounded-md">
                                {colors.map((color) => (
                                    <option value={color}>{color}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <div className="flex flex-col ">

                                <label htmlFor="size" >Size</label>
                                <select id="size" name="size" className="p-2 border rounded-md">
                                    <option value="xs">XS</option>
                                    <option value="s">S</option>
                                    <option value="m">M</option>
                                    <option value="l">L</option>
                                    <option value="xl">XL</option>
                                    <option value="xxl">XXL</option>
                                </select>

                            </div>
                        </div>


                    </div>
                    <div className="flex  gap-4 items-center">
                        <div>
                            <div className="flex flex-col ">
                                <label htmlFor="barcode">Barcode</label>
                                <input className="form-input-text rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" type="text" name="barcode" id="barcode" />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col ">
                                <label htmlFor="groupID">Group ID</label>
                                <input className="h-[2.2em] rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" type="text" name="groupID" id="groupID" />
                            </div>
                        </div>


                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="flex gap-2 flex-col w-fit ">
                        <label htmlFor="gender" >Gender</label>
                        <select id="gender" name="gender" className="p-2 border rounded-md">
                            <option value="man">Man</option>
                            <option value="woman">Woman</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="brand" >Brand</label>
                        <select id="brand" name="brand" className="p-2 border rounded-md">
                            <option value="nike">Nike</option>
                            <option value="adidas">Adidas</option>
                            <option value="funkyBuddha">Funky Buddha</option>
                            <option value="puma">Puma</option>
                            <option value="destroy">Destroy</option>
                            <option value="emerson">Emerson</option>
                            <option value="scorch&soda">Scorch & Soda</option>
                            <option value="lonsdale">Lonsdale</option>
                            <option value="makistselios">Makis Tselios</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 w-fit ">
                        <label htmlFor="category" >Category</label>
                        <select id="category" name="category" className="p-2 border rounded-md">
                            <option value="clothing">Clothing</option>
                            <option value="shoes">Shoes</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="type" >Type</label>
                        <select id="type" name="type" className="p-2 border rounded-md">
                            <option value="tshirt">T-shirt</option>
                            <option value="jeans">Jeans</option>
                            <option value="jackets">Jackets</option>
                            <option value="shoes">Shoes</option>
                        </select>
                    </div>
                </div>







                <div className="flex flex-col ">
                    <label htmlFor="shortDescription">Short Description</label>
                    <textarea className="rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" name="shortDescription" id="shortDescription"></textarea>
                </div>

                <div className="flex flex-col ">
                    <label htmlFor="description">Description</label>
                    <textarea className="rounded border-1 border-stone-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 transition-outline duration-300" name="description" id="description"></textarea>
                </div>

                <div className="flex flex-col ">
                    <label htmlFor="images">Images</label>
                    <input type="file" name="images" id="images" />
                </div>
            </div>
        </div>
    );
}
