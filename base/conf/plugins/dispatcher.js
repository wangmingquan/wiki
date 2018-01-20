/**
 * @file YOG2 系统路由配置
 * @author fis@baidu.com
 *
 * 用于管理URL与action之间的映射关系，默认的路由规则为
 *
 * http://www.example.com/home/index => app/home/action/index.js
 * http://www.example.com/home/doc/detail => app/home/action/doc/detail.js
 *
 * 如果上述规则没有匹配成功，会尝试匹配同名文件夹下的index.js，即
 *
 * http://www.example.com/home/index => app/home/action/index/index.js
 * http://www.example.com/home/doc/detail => app/home/action/doc/detail/index.js
 */

/* global yog */

module.exports.dispatcher = {

    /**
     **************************************************************************
     *
     * 系统根路由
     *
     *
     * 系统根路由可以在自动路由生效前干预转发规则
     *
     * 你可以为一个app设置一个别名
     * router.use('/custom', yog.dispatcher.router('home'))
     *
     * http://www.example.com/custom => app/home/action/index/index.js
     *
     * 你可以直接建立一个特殊的URL
     * router.get('/somespecial', yog.dispatcher.action('home/doc/detail'))
     *
     * http://www.example.com/somespecial => app/home/action/doc/detail.js
     *
     * 你也可以在此处将router当成app使用，加载任意中间件
     *
     ***************************************************************************/

    rootRouter: function (router) {

    },
    /**
     **************************************************************************
     *
     * 默认路由配置
     *
     *
     * 当显式声明的Router无法找到时，Router会设置为默认路由
     *
     * 显式声明的Router会作为Action去查找
     *
     * http://www.example.com/doc/detail => app/home/action/doc/detail.js
     ***************************************************************************/

    defaultRouter: 'home',

    /**
     **************************************************************************
     *
     * 默认Action配置
     *
     *
     * 当没有制定Action时，会使用默认Action
     *
     * http://www.example.com/home => app/home/action/index.js
     ***************************************************************************/

    defaultAction: 'index',

    /**
     **************************************************************************
     *
     * appPath配置
     *
     *
     * 指定Yog项目的App路径
     *
     ***************************************************************************/

    appPath: yog.ROOT_PATH + '/app'
};
