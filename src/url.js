/**
 * 分离url的域名和参数
 * @param {*} url 
 * @returns 
 */
function getUrlQuery (url) {
    let query = {}
    return {
        domain: url.replace(/([^?&=]+)=([^&]+)/g, (_,k,v) => query[k] = v),
        query
    }
}