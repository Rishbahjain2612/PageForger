import { Menu } from '@headlessui/react'
import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function ProfileMenuItem({text}) {
    return (
        <Menu.Item>
            {({ active }) => (
                <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                    {text}
                </a>
            )}
        </Menu.Item>
    )
}

export default ProfileMenuItem