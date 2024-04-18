const getFileExtension = (fileName: string): string => {
    return fileName.slice(fileName.lastIndexOf('.'));
};

export default getFileExtension;
