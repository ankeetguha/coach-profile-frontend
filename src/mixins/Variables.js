var skipperAPIURL;
if (process.env.VUE_APP_MODE == 'development')
    skipperAPIURL = process.env.VUE_APP_SKIPPER_URL_DEV;
else
    skipperAPIURL = process.env.VUE_APP_SKIPPER_URL;

module.exports = {
    skipperAPIURL
}