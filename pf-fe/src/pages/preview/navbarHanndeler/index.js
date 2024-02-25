
import React from 'react';
import NavBarComponent from '../../navbar';

export default function NavbarHandel() {
  // Retrieve data from localStorage
  const navigation = JSON.parse(localStorage.getItem('navigation'));
  const logoSrc = JSON.parse(localStorage.getItem('navigationLogo')).logoSrc;
  const showImages = JSON.parse(localStorage.getItem('navigationLogo')).showImages;
  const profileImgSrc = JSON.parse(localStorage.getItem('navigationProfile')).profileImgSrc;
  const showProfileImages = JSON.parse(localStorage.getItem('navigationProfile')).showProfileImages;

  return (
    <NavBarComponent
      navigation={navigation}
      logoSrc={logoSrc}
      showImages={showImages}
      profileImgSrc={profileImgSrc}
      showProfileImages={showProfileImages}
      showForms={false} // Pass a prop to indicate that forms should not be rendered
    />
  );
}
