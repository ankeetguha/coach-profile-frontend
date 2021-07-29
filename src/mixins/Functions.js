//Importing AuthService for Logout
import CoachService from "@/controllers/CoachService";

//Importing libraries
import moment from 'moment';
import _ from "lodash";

export default {
    methods: {
        async getCoach(fields) {
            if (_.isEmpty(this.$store.coach)) {
                const coach = await CoachService.GetCoach(fields);
                
                this.$store.commit("updateCoach", coach);
                return coach;
            } else {
                return this.$store.coach;
            }
        },

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
    },
};