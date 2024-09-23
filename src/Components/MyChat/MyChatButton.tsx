import { AnimatePresence, motion } from 'framer-motion';
import { PiChatsTeardrop, PiX } from 'react-icons/pi';

interface Props {
    isModalOpen: boolean;
    onMyChatButtonClick(): void;
}

export default function MyChatButton({ isModalOpen, onMyChatButtonClick }: Props) {
    return (
        <div className={'tooltip tooltip-bottom rounded-full shadow-2xl'} data-tip={'나의 채팅'}>
            <button
                className={'flex items-center justify-center rounded-full bg-plump-purple-600 p-3.5 shadow-2xl'}
                type={'button'}
                onClick={onMyChatButtonClick}
            >
                <AnimatePresence initial={false} mode={'popLayout'}>
                    {isModalOpen ? (
                        <motion.div
                            key={'open'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <PiX className={'size-9 text-white'} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key={'close'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <PiChatsTeardrop className={'size-9 text-white'} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
}
