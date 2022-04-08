module.exports = {
    devServer: {
        port: 8081,
      },
    outputDir: '../backend/frontend',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "🔥 Loading...";
                return args;
            })
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                @import "@/assets/styles/_variables.scss"; 
                @import "@/assets/styles/_mixins.scss";`
            }

        }
    }
};