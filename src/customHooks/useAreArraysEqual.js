const useAreArraysEqual = (array1, array2) => {
    if(array1?.length !== array2?.length) return false;
    for( let i=0; i< array1.length; i++ ) {
        for( let j=0; j< array2.length; j++ ) {
            if(array1[i] !== array2[j]) return false;
        }
    }
    return true;
}

export default useAreArraysEqual;