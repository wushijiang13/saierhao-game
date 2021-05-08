const path=require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
let nodeCode=process.env.NODE_ENV;
console.log(nodeCode);

module.exports={
    publicPath: process.env.NODE_ENV =='development' ?  "/" : './', // 设置加载静态资源的路径为相对路径
    outputDir:'dlist',
    productionSourceMap: false,
    devServer:{
        hot:true,
    },

   chainWebpack:config =>{
        config.plugin('html').tap(arg=>{
             arg[0].title='兴服启动器';
             return arg;
        })
       const oneOfsMap = config.module.rule("scss").oneOfs.store;
       oneOfsMap.forEach(item => {
           item
               .use("sass-resources-loader")
               .loader("sass-resources-loader")
               .options({
                   // 公用scss
                   resources: "./src/assets/css/utils.scss"
               })
               .end();
       });
        if(process.env.NODE_ENV =='development'){
            //开发环境
        }else{
            //生产环境
            // config.plugin('html').tap(arg=>{
            //     arg[0].title='QQ音乐时尚潮流';
            //     return arg
            // })
        }
   },
}