"use client";

import React, { useState } from 'react';

interface FilterCompProps {
    onCountryChange: (value: string) => void;
    onHeadingChange: (value: string) => void;
}

export const FilterComp: React.FC<FilterCompProps> = ({ onCountryChange, onHeadingChange }) => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedHeading, setSelectedHeading] = useState('');

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCountry(value);
        onCountryChange(value);
    };

    const handleHeadingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedHeading(value);
        onHeadingChange(value);
    };

    return (
        <div className="flex gap-5 items-center">
            <div className='border rounded-md px-[10px] py-[4px]'>
                <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Country</option>
                    <option value="in">India</option>
                    <option value="us">USA</option>
                    <option value="au">australia</option>
                    <option value="ca">canada</option>
                </select>
            </div>

            <div className='border rounded-md px-[10px] py-[4px]'>
                <select id="heading" value={selectedHeading} onChange={handleHeadingChange}>
                    <option value="">Heading</option>
                    <option value="sports">Sports</option>
                    <option value="politics">Politics</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="science">Science</option>
                    <option value="technology">Technology</option>
                    <option value="health">Health</option>
                </select>
            </div>
        </div>
    );
};
