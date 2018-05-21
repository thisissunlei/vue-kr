function colorStatus(status){
    var color='';
    switch (status) {
        case 'AVAILABLE':
            color='#BCE590'
            break;
        case 'NOT_EFFECT':
            color='#FFE08F'
            break; 
        case 'IN_RENT':
            color='#FFC684'
            break; 
        default:{
            color='#E4E4E4'
            break;  
        }
    }
    return color
}
export default colorStatus