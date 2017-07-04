console.log('main11111');


function compare(newVal, oldVal) {
    let arr = newVal.split(',');
    let list = ['ALL', 'aa', 'bb', 'cc'];
    let total = list.length;
    let len = arr.length;
    let result = '';
    let isAll = /ALL/.test(newVal);
    if (isAll) {
        if (len !== total) {  arr.shift();}
        result = arr.join(',');
    } else {
        if (len === (total - 1)) {result = list.join(',');
        } else {result = newVal;}
    }
    return result;
}
