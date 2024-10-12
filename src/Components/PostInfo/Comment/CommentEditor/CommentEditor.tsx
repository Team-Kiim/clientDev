import { useEffect } from 'react';
import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extension-placeholder';
import CommentEditorToolbar from '@/Components/PostInfo/Comment/CommentEditor/CommentEditorToolbar.tsx';
import CodeBlockComponent from '@/Components/PostInfo/Comment/CommentEditor/CodeBlockComponent.tsx';

interface Props {
    submitCount?: number;
    value?: string;
    isSubmitSuccessful?: boolean;
    onChange: (...args: any) => any;
    onBlur: (...args: any) => any;
}

export default function CommentEditor({ value, isSubmitSuccessful, submitCount, onChange, onBlur }: Props) {
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

            CodeBlockLowlight.extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlockComponent);
                },
            }).configure({
                lowlight: createLowlight(common),
                languageClassPrefix: 'language-',
            }),

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
                codeBlock: false,
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
            if (value !== undefined) {
                editor.commands.setContent(value);
            }
        }
    }, [editor]);

    useEffect(() => {
        if (editor) {
            if (isSubmitSuccessful) {
                editor.commands.clearContent();
            }
        }
    }, [isSubmitSuccessful, editor, submitCount]);

    return (
        <>
            <CommentEditorToolbar editor={editor} />
            <div
                className={`!prose-code:whitespace-pre prose max-w-full shrink-0 flex-grow basis-0 overflow-y-auto overscroll-y-contain px-2.5 pb-1 pt-2 text-[0.9rem] text-black prose-p:my-1.5 prose-p:mt-0 prose-a:text-violet-700 prose-pre:text-[0.9rem] [&>div]:h-full`}
            >
                <EditorContent editor={editor} />
            </div>
        </>
    );
}
