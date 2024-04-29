const pattern = /!4:IR:([0|1])#*/;
const match = pattern.exec("!4:I:1#")
console.log(!match)