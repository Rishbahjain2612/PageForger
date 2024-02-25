import React, { useState, useEffect } from 'react';
import FooterComponent from './footerComponent';

function Footer() {
    const [formData, setFormData] = useState({
        facebook: '',
        twitter: '',
        google: '',
        insta: '',
        linkedin: '',
        github: ''
    });

    useEffect(() => {
        const storedFormData = localStorage.getItem('footerFormData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('footerFormData', JSON.stringify(formData));
    };

    return (
        <>
            <div className='m-4'>
                <FooterComponent
                    facebook={formData.facebook}
                    twitter={formData.twitter}
                    google={formData.google}
                    insta={formData.insta}
                    linkedin={formData.linkedin}
                    github={formData.github}
                />
                <form onSubmit={handleSubmit} className="mt-4 p-4 border border-gray-200 rounded-lg">
                    <label htmlFor="facebook" className="block mb-2">Facebook URL:</label>
                    <input
                        type="text"
                        id="facebook"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                     <label htmlFor="twitter" className="block mb-2">Twitter URL:</label>
                    <input
                        type="text"
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <label htmlFor="google" className="block mb-2">Google URL:</label>
                    <input
                        type="text"
                        id="google"
                        name="google"
                        value={formData.google}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <label htmlFor="insta" className="block mb-2">Instagram URL:</label>
                    <input
                        type="text"
                        id="insta"
                        name="insta"
                        value={formData.insta}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <label htmlFor="linkedin" className="block mb-2">LinkedIn URL:</label>
                    <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <label htmlFor="github" className="block mb-2">GitHub URL:</label>
                    <input
                        type="text"
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {/* Repeat similar inputs for other social media URLs */}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Footer;
