const useBytesConvertor = (size) => {
    let val;
    const fileSizeKB = size / 1000;
    if (fileSizeKB < 1000) {
        return (val = fileSizeKB.toFixed(2) + " KB");
    } else {
        const fileSizeMB = fileSizeKB / 1000;
        return (val = fileSizeMB.toFixed(2) + " MB");
    }
};

export default useBytesConvertor;
