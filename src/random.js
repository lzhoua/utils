/**
 * 创建一个 min - max 范围内的随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns Number
 */
function randomNum(min = 0, max = 10) {
    return parseInt(Math.random() * (max - min + 1) + min, 10)
}

/**
 * 从 `arr` 中 随机选取 `count` 个值
 * @param {*} arr 被抽取的数组
 * @param {*} count 抽取的个数
 * @returns Array
 */
function randomArrayElements(arr, count) {
    let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

/**
 * 生成长度为11的随机字母数字字符串
 */
function randomId() {
    Math.random().toString(36).substring(2)
}