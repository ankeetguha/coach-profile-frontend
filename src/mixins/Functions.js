//Importing AuthService for Logout
import CoachService from "@/controllers/CoachService";

//Importing moment.js for time based functions
import moment from 'moment';

export default {
    methods: {
        //Extract first name from string
        getFirstName(fullName) {
            if (fullName.indexOf(' ') >= 0) {
                fullName = fullName.split(' ');
            }
            return fullName[0];
        },

        //Reset form fields
        resetFields(formFields) {
            for (const field of Object.keys(formFields)) {
                if (formFields[field].type == "group")
                    this.resetFields(formFields[field].fields)
                else if (formFields[field].type == "file-large")
                    formFields[field].fileList = [];
                else {
                    formFields[field].value = null;
                }
            }
        },

        //Conver the number to Indian Number
        convertToIndianNumber(number) {
            if (typeof number == 'number')
                return number.toLocaleString('en-IN');
            else
                return parseInt(number).toLocaleString('en-IN');
        },

        //Convert to date and month
        convertToMonthDate(date) {
            return moment(date).format('Do MMMM');
        },

        async getCoach() {
            const coach = await CoachService.GetCoach();

            //Check the coach doesn't exist and redirect
            if (!coach) {
                this.$store.commit("updateCoach", {
                    fullName: null,
                    email: null,
                    groups: [],
                    loggedIn: false,
                });
                return false;
            } else {
                this.$store.commit("updateCoach", {
                    fullName: coach.fullName,
                    email: coach.email,
                    groups: coach.groups,
                    loggedIn: true,
                });
                return true;
            }
        },
    },
};