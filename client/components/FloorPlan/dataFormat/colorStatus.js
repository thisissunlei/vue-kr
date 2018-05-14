function colorStatus(status){
    var color='';
    switch (status) {
        case 'AVAILABLE':
            color='yellow'
            break;
        case 'NOT_EFFECT':
            color='#ccc'
            break; 
        case 'IN_RENT':
            color='#499df1'
            break; 
        default:
            color='#000' 
            break;
    }
    return color
}
export default colorStatus