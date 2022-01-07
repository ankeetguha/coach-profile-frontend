var skipperAPIURL;
if (process.env.VUE_APP_MODE == 'development')
    skipperAPIURL = process.env.VUE_APP_SKIPPER_URL_DEV;
else if (process.env.VUE_APP_MODE == 'staging')
    skipperAPIURL = process.env.VUE_APP_SKIPPER_URL_STAGING;
else
    skipperAPIURL = process.env.VUE_APP_SKIPPER_URL;

module.exports = {
    skipperAPIURL
}