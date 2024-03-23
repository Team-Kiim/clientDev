import { useState } from 'react';
import PostToggle from '@/Components/PostSearchFilter/PostToggle.tsx';

export default function SearchFilter() {
    return (
        <div className={'flex justify-between'}>
            <div />
            <PostToggle />
        </div>
    );
}
