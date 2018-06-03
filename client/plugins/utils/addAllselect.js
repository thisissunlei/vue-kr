function addAllselect(str,arr){
    arr.unshift({
        desc:str,
        value:' ',
        code:0,

    })
    return [].concat(arr);
}
export default addAllselect;