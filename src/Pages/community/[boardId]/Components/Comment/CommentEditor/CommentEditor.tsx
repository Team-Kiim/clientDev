import { useEffect } from 'react';
import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extension-placeholder';
import CommentEditorToolbar from '@/Pages/community/[boardId]/Components/Comment/CommentEditor/CommentEditorToolbar.tsx';

interface Props {
    isSubmitSuccessful: boolean;
    onChange: (...args: any) => any;
    onBlur: (...args: any) => any;
}

export default function CommentEditor({ isSubmitSuccessful, onChange, onBlur }: Props) {
    const editor = useEditor({
        onUpdate: ({ editor }) => {
            const commentValue = editor.getHTML();
            if (commentValue.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                onChange('');
            } else {
                onChange(commentValue);
            }
        },
        onBlur,
        extensions: [
            // @ts-ignore
            Color.configure({ types: [TextStyle.name, ListItem.name] }),

            // @ts-ignore
            TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),

            Link.configure({
                openOnClick: true,
                autolink: true,
                // @ts-ignore
                defaultProtocol: 'https',
            }),

            Placeholder.configure({
                placeholder: '내용을 작성해주세요.',
            }),
        ],
    });

    useEffect(() => {
        if (editor) {
            if (isSubmitSuccessful) {
                editor.commands.clearContent();
            }
        }
    }, [isSubmitSuccessful, editor]);

    return (
        <>
            <CommentEditorToolbar editor={editor} />
            <div
                className={
                    'prose max-w-full shrink-0 flex-grow basis-0 overflow-y-auto overscroll-y-contain px-2.5 py-1 text-[0.9rem] text-black prose-p:my-1.5 prose-a:text-violet-700'
                }
            >
                <EditorContent editor={editor} />
            </div>
        </>
    );
}
