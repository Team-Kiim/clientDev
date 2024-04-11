const formatBytes: (bytes: number, decimals?: number) => string = (bytes, decimals) => {
    if (bytes === 0) {
        return '0 Byte';
    } else {
        const k = 1024;
        const dm = decimals ?? 3;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
    }
};

export default formatBytes;
