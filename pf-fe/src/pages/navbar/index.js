import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Smallmenu from './smallmenu';
import ProfileMenuItem from './profilemenuItem';
import HandleTiles from './navbarTiles';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBarComponent() {
  const [navigation, setNavigation] = useState(() => {
    const storedNavigation = localStorage.getItem('navigation');
    return storedNavigation ? JSON.parse(storedNavigation) : [{ name: 'Dashboard', href: '#' }];
  });

  const [logoSrc, setLogoSrc] = useState(() => {
    const storedLogoSrc = localStorage.getItem('navigationLogo');
    return storedLogoSrc ? JSON.parse(storedLogoSrc).logoSrc : 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500';
  });

  const [profileImgSrc, setProfileImgSrc] = useState(() => {
    const storedProfileImgSrc = localStorage.getItem('navigationProfile');
    return storedProfileImgSrc ? JSON.parse(storedProfileImgSrc).profileImgSrc : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
  });

  const [showImages, setShowImages] = useState(() => {
    const storedLogoSrc = localStorage.getItem('navigationLogo');
    return storedLogoSrc ? JSON.parse(storedLogoSrc).showImages : false;
  });

  const [showProfileImages, setShowProfileImages] = useState(() => {
    const storedSrc = localStorage.getItem('navigationProfile');
    return storedSrc ? JSON.parse(storedSrc).showProfileImages : false;
  });

  useEffect(() => {
    localStorage.setItem('navigation', JSON.stringify(navigation));
  }, [navigation]);

  useEffect(() => {
    localStorage.setItem('navigationLogo', JSON.stringify({ logoSrc, showImages }));
  }, [logoSrc, showImages]);

  useEffect(() => {
    localStorage.setItem('navigationProfile', JSON.stringify({ profileImgSrc, showProfileImages }));
  }, [profileImgSrc, showProfileImages]);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 mx-3 mt-3">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                  {showImages && (
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src={logoSrc}
                        alt="Your Company"
                      />
                    </div>
                  )}

                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    {showProfileImages && (

                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            /* edit this src link on runtime */
                            src={profileImgSrc}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                    )}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <ProfileMenuItem text="Your Profile"></ProfileMenuItem>
                        <ProfileMenuItem text="Settings"></ProfileMenuItem>
                        <ProfileMenuItem text="Change Account"></ProfileMenuItem>
                        <ProfileMenuItem text="Sign out"></ProfileMenuItem>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <Smallmenu></Smallmenu>
          </>
        )}
      </Disclosure>

      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-1/2">
          <HandleTiles tiles={navigation} setTiles={setNavigation} className="my-4" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-[80%] mx-auto mt-4">
            <label htmlFor="showImages" className="block text-gray-700 text-sm font-bold mb-2">
              Show Images
            </label>



            <>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Form to change logo src */}
                <input
                  type="checkbox"
                  id="showImages"
                  checked={showImages}
                  onChange={(e) => setShowImages(e.target.checked)}
                  className="mr-2 leading-tight"
                />
                <label htmlFor="showImages">Check to add Logo Image</label>


                <label htmlFor="logoSrc" className="block text-gray-700 text-sm font-bold mt-4">Change Logo URL:</label>
                <input
                  type="text"
                  id="logoSrc"
                  value={logoSrc}
                  onChange={(e) => setLogoSrc(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </form>

              {/* Form to change profile image src */}
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <input
                  type="checkbox"
                  id="showImages"
                  checked={showProfileImages}
                  onChange={(e) => setShowProfileImages(e.target.checked)}
                  className="mr-2 leading-tight"
                />
                <label htmlFor="showImages">Check to add Profile Image</label>
                <label htmlFor="profileImgSrc" className="block text-gray-700 text-sm font-bold mt-4">Change Profile Image URL:</label>
                <input
                  type="text"
                  id="profileImgSrc"
                  value={profileImgSrc}
                  onChange={(e) => setProfileImgSrc(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />


              </form>
            </>

          </div>
        </div>
      </div>
    </>
  );
}
