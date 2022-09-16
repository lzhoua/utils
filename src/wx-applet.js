/**
 * 一些在小程序运行时候的监听方法，直接copy在控制台可使用
 * 用于排错
 */
(function() {
    // 监听小程序所有 setTimeout 调用
    let _setTimeout = setTimeout
    setTimeout = function(fn, time) {
        console.log('监听setTimeout--->', fn, time)
        return _setTimeout(fn, time)
    }

    // 监听小程序的所有 setInerVal
    let _setInterval = setInterval
    setInterval = function(fn, time) {
        console.log('监听setInterval--->', fn, time)
        return _setInterval(fn, time)
    }

    // 监听微信 wx 上的所有api调用
    function logObjProxy (o, preKey) {
        return new Proxy(o, {
            get (target, propKey) {
                if (typeof target[propKey] === 'object') {
                    return logObjProxy(target[propKey], propKey)
                }
                return function (...arg) {
                    console.log('微信api:', preKey ? `${preKey}.${propKey}` : propKey, '参数：', ...arg);
                    return target[propKey](...arg)
                }
            }
        })
    }
    let _wx = wx
    wx = logObjProxy(_wx, 'wx')

    // 监听微信的setData调用
    const _Page = Page
    const _Component = Component
    function monitorSetData () {
        const _setData = this.setData
        this.setData = function (...arg) {
            console.log('监听setData--->', ...arg);
            return _setData.apply(this, arg)
        }
    }
    Page = function (options) {
        const _onLoad = options.onLoad
        options.onLoad = function (p) {
            monitorSetData.bind(this)()
            return _onLoad.call(this, p)
        }
        return _Page(options)
    }
    Component = function (options = {}) {
        if (!options.lifetimes) {
            options.lifetimes = {
                created: function () {
                    monitorSetData.bind(this)()
                }
            }
        } else if (!options.lifetimes.created) {
            options['lifetimes']['created'] = function () {
                monitorSetData.bind(this)()
            }
        }  else {
            const _created = options.lifetimes.created
            options.lifetimes.created = function (p) {
                monitorSetData.bind(this)()
                return _created.call(this, p)
            }
        }
        return _Component(options)
    }

    // 监听微信所有请求
    const _request = wx.request
    wx.request = function (options) {
      const _success = options.success
      options.success = function (...args) {
        console.log('----------------------------------------------------')
        console.log('接口地址：', options.url)
        console.log('接口入参：', options.data)
        console.log('成功：', ...args)
        console.log('----------------------------------------------------')
        return _success(...args)
      }
      return _request(options)
    }
})();