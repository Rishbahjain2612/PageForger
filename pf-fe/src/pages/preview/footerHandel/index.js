import React, { useState, useEffect } from 'react';
import FooterComponent from '../../footer/footerComponent';

function FooterHandeler() {
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

    const hasValues = Object.values(formData).some(value => value !== '');

    return hasValues ? <FooterComponent
        facebook={formData.facebook}
        twitter={formData.twitter}
        google={formData.google}
        insta={formData.insta}
        linkedin={formData.linkedin}
        github={formData.github}
    /> : null;
}

export default FooterHandeler;
