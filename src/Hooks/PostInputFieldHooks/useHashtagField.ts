import { nanoid } from 'nanoid';
import { useState } from 'react';

interface Hashtag {
    id: number | string;
    content: string;
}

const useHashtagField = (initialHashtagInfoList: Hashtag[]) => {
    const [hashtagInfoList, setHashtagInfoList] = useState<Hashtag[]>(initialHashtagInfoList);

    const addHashtag = (hashtagContent: string) => {
        if (!hashtagInfoList.find(hashtagInfo => hashtagInfo.content === hashtagContent)) {
            setHashtagInfoList([
                ...hashtagInfoList,
                {
                    id: nanoid(),
                    content: hashtagContent,
                },
            ]);
        }
    };

    const deleteHashtag = (hashtagInfoToDelete: Hashtag) => {
        setHashtagInfoList(hashtagInfoList.filter(hashtagInfo => hashtagInfo.id !== hashtagInfoToDelete.id));
    };

    const deleteAllHashtags = () => {
        setHashtagInfoList([]);
    };

    return {
        hashtagInfoList,
        addHashtag,
        deleteHashtag,
        deleteAllHashtags,
    };
};

export default useHashtagField;
