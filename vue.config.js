module.exports = {
    outputDir: 'dist',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Skipper - Launch Your Insta Website";
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