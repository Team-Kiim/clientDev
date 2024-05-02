import { create } from 'zustand';

interface QnATypeStore {
    qnaType: string;
    updateQnAType: (newQnAType: string) => void;
}

const useQnATypeStore = create<QnATypeStore>(setState => ({
    qnaType: 'dev',
    updateQnAType: newQnAType => {
        setState(() => ({
            qnaType: newQnAType,
        }));
    },
}));

export default useQnATypeStore;
