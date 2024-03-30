import KeywordSearchInput from '@/Components/PostSearchFilter/KeywordSearchInput.tsx';
import PostTypeToggleButton from '@/Components/PostSearchFilter/PostTypeToggleButton.tsx';

export default function SearchFilter() {
    return (
        <div className={'flex justify-between'}>
            <KeywordSearchInput />
            <PostTypeToggleButton />
        </div>
    );
}
