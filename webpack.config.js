//这个配置文件,其实就是一个 js文件，通过 Node 中的模块操作，向外暴露一个配置对象

const path = require('path')
//启用热更新的第2步
const webpack = require('webpack')
//导入在内存中生成HTML 页面的插件，只要是插件就要放到plugins 节点中去
//这个插件的两个作用:1.自动在内存中根据指定页面生成一个内存的页面 
//2.自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 在配置文件中，手动指定入口和出口
    //入口,要使用 webpack 打包哪个文件
    entry :path.join(__dirname,'./src/main.js'), 
    // 输出文件相关的配置   
    output:{    
         //指定打包好的文件,输出到哪个目录中去
        path: path.join(__dirname,'./dist'),
        //这是指定 输出的文件的名称   
        filename:'bundle.js' 
},
// devServer:{     //这是配置dev-server 命令参数的第二种形式,相对于第一种，麻烦一些
    // webpack-dev-server --open chrome --contentBase src --hot
//     open:true,
//     post:3000,             //
//     contentBase:'src',  //指定托管的根目录
//     hot:true,       //启动热更新的第1步
// },
plugins:[   //配置插件的节点
    // new webpack.HotModuleReplacementPlugin(),    //new 一个热更新的模块对象,这是启用热更新的第3步
    //创建一个在内存中生成html页面的插件
    new htmlWebpackPlugin({
        //指定模板页面,将来会根据指定的页面路径，去生成内存中的页面
        template:path.join(__dirname,'./src/index.html'),
        //指定生成页面的名称
        filename:'index.html' 
    }),
    new VueLoaderPlugin()
    
    ],
    module:{
        //这个节点用于配置所有第三方加载器
        rules:[
            //所有第三方模块的匹配规则
            //配置处理.css文件的第三方loader规则,从右往左调用
            {test:/\.css$/,use:['style-loader','css-loader']}, 
            //配置处理.less文件的第三方loader规则
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=42130&name=[hash:8]-[name].[ext]'}, //处理图片路径的loader
            // 注意: limit给定的值是图片大小,单位是byte，如果引用图片大于或等于limit值，则不会被转成base64格式的字符串
            {test:/\.(ttf|eot|svg|woff|woff2|otf)$/,use:'url-loader'},   //处理字体文件的loader
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},    //这是配置babel转为高级的ES语法
            {test:/\.vue$/,use:'vue-loader'}    //这是配置 .vue 文件的 loader
        ]
    },
    resolve:{
        alias:{
            // 修改 Vue 被导入时包的路径
            "vue$" : "vue/dist/vue.js"
        }
    }
}

// 当我们在控制台执行 webpack 命令时，webpack做了以下几步：
// 1.webpack发现我们并没有通过命令的形式,给它指定入口和出口
// 2.webpack就会去项目的根目录中,查找一个叫做 'webpack.config.js' 的配置文件
// 3.当找到配置文件后,会解析执行这个配置文件.当解析执行完配置文件后,就得到了配置文件中,导出的配置对象
// 4.当webpack 拿到配置对象后，就拿到了配置文件中指定的入口和出口。然后进行打包构建


//把src/index.js也方法电脑内存中
//1.安装工具npm i html-webpack-plugin -D 
//2.导入这个插件