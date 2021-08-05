//Importing CoachService
import CoachService from "@/controllers/CoachService";

//Importing libraries
import moment from 'moment';
import _ from "lodash";

export default {
    methods: {
        async getCoach(fields) {
            if (_.isEmpty(this.$store.state.coach)) {
                const coach = await CoachService.GetCoach(fields);

                this.$store.commit("updateCoach", coach);
                return coach;
            } else {
                return this.$store.state.coach;
            }
        },

        //Extract first name from string
        getFirstName(fullName) {
            if (fullName.indexOf(' ') >= 0) {
                fullName = fullName.split(' ');
            }
            return fullName[0];
        },

        validateForm(formFields) {
            var hasErrors = false;

            for (const field of Object.keys(formFields)) {
                if (formFields[field].type == 'group') {
                    this.validateForm(formFields[field].fields)
                } else if (!this.validateData(formFields[field])) {
                    formFields[field].hasError = true;
                    hasErrors = true;
                } else {
                    formFields[field].hasError = false;
                }
            }
            return {
                hasErrors: hasErrors,
                formFields: formFields
            };
        },

        validateData(field) {
            switch (field.type) {
                case "text":
                case "textarea":
                case "tel":
                case "date":
                case "number":
                case "money":
                case "password":
                    if (field.required && (field.value == undefined || field.value.length == 0))
                        return false
                    else return true;

                case "toggle":
                case "checkbox":
                    return true;

                case "radio":
                    if (field.required && (field.modelName == undefined || field.modelName.length == 0))
                        return false
                    else return true;

                case "file-large":
                    if (field.required && (field.fileList == undefined || field.fileList.length == 0))
                        return false;
                    else
                        return true;

                case "dropdown":
                    if (field.required && field.value == null)
                        return false;
                    else
                        return true;

                case "multiple-select-dropdown":
                    if (field.required && field.selectedItems.length == 0)
                        return false;
                    else
                        return true;

                case "email":
                    if (field.required && (field.value == undefined || field.value.length == 0))
                        return false;
                    else if (!field.required && (field.value == undefined || field.value.length == 0)) {
                        return true;
                    } else {
                        var emailValidator = /^\w+[\w-+.]*@\w+([-.]\w+)*\.[a-zA-Z]{2,}$/;
                        return field.value.match(emailValidator);
                    }
            }
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

        //Check if the device is mobile
        isMobile() {
            if (window.outerWidth > 800)
                return false
            else
                return true
        }
    },
};