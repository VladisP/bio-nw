export const isValid = (seq: string): boolean => {
    return /^[A-Z]+$/.test(seq);
};

export const isDNA = (seq: string): boolean => {
    return /^[ATGC]+$/.test(seq);
};

export const isAmino = (seq: string): boolean => {
    return /^[ARNDCQEGHILKMFPSTWYV]+$/.test(seq);
};
