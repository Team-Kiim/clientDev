import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

export default function CodeBlockComponent({
    node: {
        attrs: { language: defaultLanguage },
    },
    updateAttributes,
    extension,
}) {
    console.log(defaultLanguage);
    return (
        <NodeViewWrapper className={'relative'}>
            <select
                className={'select select-sm absolute right-0 top-0 bg-neutral-800 text-white focus:outline-none'}
                contentEditable={false}
                defaultValue={defaultLanguage}
                onChange={event => updateAttributes({ language: event.target.value })}
            >
                <option value='null'>auto</option>
                <option disabled>—</option>
                {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
                    <option key={index} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
            <pre className={'!bg-neutral-800 py-8'}>
                <NodeViewContent as='code' className={'!whitespace-pre'} />
            </pre>
        </NodeViewWrapper>
    );
}
