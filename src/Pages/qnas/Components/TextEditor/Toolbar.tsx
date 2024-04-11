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
                <div className={'tooltip tooltip-bottom'} data-tip={'볼드체'}>
                    <button className={'ql-bold !size-10'} />
                </div>
                <div className={'tooltip tooltip-bottom'} data-tip={'이탤릭체'}>
                    <button className={'ql-italic !size-10'} />
                </div>
                <div className={'tooltip tooltip-bottom'} data-tip={'밑줄'}>
                    <button className={'ql-underline !size-10'} />
                </div>
                <div className={'tooltip tooltip-bottom'} data-tip={'취소선'}>
                    <button className={'ql-strike !size-10'} />
                </div>
            </span>
            <span className={'ql-formats !flex !gap-x-4'}>
                <div className={'tooltip tooltip-bottom'} data-tip={'숫자 리스트'}>
                    <button className={'ql-list !size-10'} value={'ordered'} />
                </div>
                <div className={'tooltip tooltip-bottom'} data-tip={'불릿 리스트'}>
                    <button className={'ql-list !size-10'} value={'bullet'} />
                </div>
            </span>
        </div>
    );
}
