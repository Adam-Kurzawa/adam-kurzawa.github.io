export const numberify = (number) => {
    let str = ''
    let src = number + ''

    for(let i = 0; i < src.length; i++) {
        if(i % 3 === 0 && i !== 0) {
            str += ' '
        } 
        
        str += src[i]
    }
}