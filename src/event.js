const event = {
    listenMap: {},
    /**
     * 声明一个监听
     * @param {*} key 时间key
     * @param {*} listener 监听者
     * @param {*} options 配置参数
     */
    on (key, listener, options = {}) {
        const { cover = false } = options
        // 如果不是覆盖 & 已经存在key
        if (!cover && this.listenMap[key]) {
            console.warn(`【${key}】 already exists`)
            return
        }
        this.listenMap[key] = listener
        return () => {
            
        }
    },
    /**
     * 声明一个一次性的监听
     */
    once (key, fn) {
        this.on(key, (...args) => {
            fn(args)
            this.remove(key)
        })
    },
    /**
     * 发送一个消息
     */
    emit (key, value) {
        if (!this.listenMap[key]) {
            console.warn(`【${key}】not registered`);
            return
        }
        this.listenMap[key](value)
    },
    /**
     * 移除某个监听
     */
    remove (key) {
        delete this.listenMap[key]
    },
    /**
     * 清除所有的监听
     */
    clear () {
        this.listenMap = {}
    }
}