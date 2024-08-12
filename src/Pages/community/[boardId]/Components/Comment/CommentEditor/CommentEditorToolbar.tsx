import { Editor } from '@tiptap/react';
// @ts-ignore
import { StarterKit } from '@tiptap/starter-kit';
import { FiBold, FiItalic, FiLink } from 'react-icons/fi';
import { HiOutlineCodeBracketSquare } from 'react-icons/hi2';
import { PiListBullets, PiListNumbers } from 'react-icons/pi';
import { TbStrikethrough } from 'react-icons/tb';

interface Props {
    editor: Editor;
}

export default function CommentEditorToolbar({ editor }: Props) {
    if (!editor) {
        return null;
    }

    const handleLinkButtonClick = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className={'flex border-b border-slate-200 px-2 py-1.5'}>
            <div className={'flex items-center gap-x-1'}>
                <div className={'tooltip tooltip-bottom'} data-tip={'볼드체'}>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        type={'button'}
                        className={`rounded-md p-1 ${editor.isActive('bold') ? 'bg-black text-white' : 'bg-white text-black'} transition-all`}
                    >
                        <FiBold className={'size-5'} />
                    </button>
                </div>
                <div className={'tooltip tooltip-bottom'} data-tip={'이탤릭체'}>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic()}
                        type={'button'}
                        className={`rounded-md p-1 ${editor.isActive('italic') ? 'bg-black text-white' : 'bg-white text-black'} transition-all`}
                    >
                        <FiItalic className={'size-5'} />
                    </button>
                </div>
                <div className={'tooltip tooltip-bottom'} data-tip={'취소선'}>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike()}
                        type={'button'}
                        className={`rounded-md p-1 ${editor.isActive('strike') ? 'bg-black text-white' : 'bg-white text-black'} transition-all`}
                    >
                        <TbStrikethrough className={'size-5'} />
                    </button>
                </div>
                <div className={'tooltip tooltip-bottom'} data-tip={'링크'}>
                    <button
                        onClick={handleLinkButtonClick}
                        type={'button'}
                        className={`rounded-md p-1 ${editor.isActive('link') ? 'bg-black text-white' : 'bg-white text-black'} transition-all`}
                    >
                        <FiLink className={'size-5'} />
                    </button>
                </div>
                <div className={'tooltip tooltip-bottom'} data-tip={'코드 블럭'}>
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        type={'button'}
                        className={`rounded-md p-1 ${editor.isActive('link') ? 'bg-black text-white' : 'bg-white text-black'} transition-all`}
                    >
                        <HiOutlineCodeBracketSquare className={'size-5'} />
                    </button>
                </div>
            </div>
            <div className={'divider divider-horizontal mx-0 font-normal before:bg-slate-200 after:bg-slate-200'} />
            <div className={'flex items-center gap-x-1'}>
                <div className={'tooltip tooltip-bottom'} data-tip={'불릿 목록'}>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        disabled={!editor.can().chain().focus().toggleBulletList()}
                        type={'button'}
                        className={`rounded-md p-1 ${editor.isActive('bulletList') ? 'bg-black text-white' : 'bg-white text-black'} transition-all`}
                    >
                        <PiListBullets className={'size-5'} />
                    </button>
                </div>
                <div className={'tooltip tooltip-bottom'} data-tip={'번호 목록'}>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        disabled={!editor.can().chain().focus().toggleOrderedList()}
                        type={'button'}
                        className={`rounded-md p-1 ${editor.isActive('orderedList') ? 'bg-black text-white' : 'bg-white text-black'} transition-all`}
                    >
                        <PiListNumbers className={'size-5'} />
                    </button>
                </div>
            </div>
        </div>
    );
}
