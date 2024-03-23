import { useState } from 'react';
import PostTypeToggleButton from '@/Components/PostSearchFilter/PostTypeToggleButton.tsx';

export default function SearchFilter() {
    return (
        <div className={'flex justify-between'}>
            <div />
            <PostTypeToggleButton />
        </div>
    );
}
