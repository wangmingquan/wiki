/**
 * @file YOG2 热加载配置
 * @author fis@baidu.com
 */

module.exports['recv-reload'] = {

    /**
     * 重载APP URL
     *
     * @type {String}
     */
    cleanCacheUrl: '/yog/reload',

    /**
     * fis receiver URL
     *
     * @type {String}
     */
    receiverUrl: '/yog/upload',

    /**
     * fis release 上传超时 (秒)
     * @type {Number}
     */
    uploadTimeout: 30,

    /**
     * 缓存清理回调，可以在这里添加自定义的缓存清理操作
     */
    onCacheClean: function () {}
};
