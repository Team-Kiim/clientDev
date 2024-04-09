export const modules = {
    toolbar: {
        container: '#toolbar',
    },
};

export const formats = ['bold', 'italic', 'underline', 'strike', 'list', 'bullet'];

export default function Toolbar() {
    return (
        <div
            id={'toolbar'}
            style={{ borderColor: 'rgb(229 231 235)', border: 'none', display: 'flex', justifyContent: 'center' }}
        >
            <span className={'ql-formats !flex !gap-x-4'}>
                <button className={'ql-bold !size-10'} />
                <button className={'ql-italic !size-10'} />
                <button className={'ql-underline !size-10'} />
                <button className={'ql-strike !size-10'} />
            </span>
            <span className={'ql-formats !flex !gap-x-4'}>
                <button className={'ql-list !size-10'} value={'ordered'} />
                <button className={'ql-list !size-10'} value={'bullet'} />
            </span>
        </div>
    );
}
