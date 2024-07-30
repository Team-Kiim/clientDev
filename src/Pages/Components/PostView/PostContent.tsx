import dompurify from 'dompurify';
import mermaid from 'mermaid';
import Prism from 'prismjs';
import { useEffect } from 'react';
import checkIpAddress from '@/Utils/checkIpAddress.ts';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-gradle';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-objectivec';

// 이거 먼저 import 하지 않으면, prism-php.js import 할 때 에러남.
// (참고: https://github.com/PrismJS/prism/issues/1400 )
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-typescript';

interface Props {
    bodyContent: string;
}

const changeToMermaidClass = (htmlString: string): string => {
    return htmlString.replaceAll('<code class="language-mermaid">', '<code class="mermaid">');
};

const changeImageSrc = (htmlString: string): string => {
    const { VITE_SERVER_URL } = import.meta.env;
    const srcArray: string[] = [];
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;

    while ((match = regex.exec(htmlString)) !== null) {
        const domain = match[1].split('/')[2];
        if (checkIpAddress(domain.split(':')[0])) {
            srcArray.push(match[1]);
        }
    }

    if (srcArray.length === 0) {
        return htmlString;
    }

    const domain = srcArray[0].split('/')[2];
    const domainToChange = VITE_SERVER_URL.split('/')[2];
    return htmlString.replaceAll(domain, domainToChange);
};

export default function PostContent({ bodyContent }: Props) {
    const safeHtmlString = dompurify.sanitize(bodyContent);
    const htmlContent = changeToMermaidClass(changeImageSrc(safeHtmlString));

    useEffect(() => {
        Array.from(document.getElementsByTagName('pre')).forEach($preElement => {
            $preElement.className += 'line-numbers';
        });
    }, []);

    useEffect(() => {
        mermaid.contentLoaded();
        Prism.highlightAll();
    }, []);

    return (
        <div
            className={'prose prose-sm min-h-56 max-w-full text-[0.9rem] text-[#020617] prose-strong:text-inherit'}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}
