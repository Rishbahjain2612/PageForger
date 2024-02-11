import React from 'react';
import {
    Card,
    Typography,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    UserCircleIcon,
    ViewColumnsIcon,
    PhotoIcon,
    CreditCardIcon,
    ArchiveBoxIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/solid";

import NavComponent from "./navComponent";

export function Navbar() {

    return (
        <Card className={`h-screen w-full md:w-[13vw] p-4 shadow-xl shadow-blue-gray-900/5 `}>
            <div className="mb-2 flex items-center gap-4 p-4">
                <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
                <Typography variant="h5" color="blue-gray" className="truncate">
                    Page Forger
                </Typography>
            </div>

            <div className='max-w-[240px]'>
                <NavComponent text='DashBoard' iconTag={PresentationChartBarIcon} linkPath="/"/>
                <NavComponent text='Preview' iconTag={UserCircleIcon} linkPath="/preview"/>
                <hr className="my-3 border-blue-gray-50 max-w-[10vw]" />
                <NavComponent text='NavBar' iconTag={ViewColumnsIcon} linkPath="/navbars"/>
                <NavComponent text='Cards' iconTag={CreditCardIcon} linkPath="/cards" />
                <NavComponent text='Carousel' iconTag={PhotoIcon} linkPath="/carousel" />
                <NavComponent text='Footer' iconTag={InformationCircleIcon} linkPath="/footer" />
                <hr className="my-3 border-blue-gray-50 max-w-[10vw]" />
                <NavComponent text='Positioning' iconTag={ArchiveBoxIcon} linkPath="/positioning" />
            </div>
        </Card>
    );
}

export default Navbar;
