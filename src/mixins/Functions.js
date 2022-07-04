//Importing CoachService
import CoachService from "@/controllers/CoachService";

//Importing libraries
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
      if (fullName.indexOf(" ") >= 0) {
        fullName = fullName.split(" ");
      }
      return fullName[0];
    },

    validateForm(formFields) {
      var hasErrors = false;

      for (const field of Object.keys(formFields)) {
        if (formFields[field].type == "group") {
          this.validateForm(formFields[field].fields);
        } else if (!this.validateData(formFields[field])) {
          formFields[field].hasError = true;
          hasErrors = true;
        } else {
          formFields[field].hasError = false;
        }
      }
      return {
        hasErrors: hasErrors,
        formFields: formFields,
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
          if (
            field.required &&
            (field.value == undefined || field.value.length == 0)
          )
            return false;
          else return true;

        case "country-tel":
          if (field.required && !field.isValid) return false;
          else return true;

        case "toggle":
        case "checkbox":
          return true;

        case "radio":
          if (
            field.required &&
            (field.modelName == undefined || field.modelName.length == 0)
          )
            return false;
          else return true;

        case "file-large":
          if (
            field.required &&
            (field.fileList == undefined || field.fileList.length == 0)
          )
            return false;
          else return true;

        case "dropdown":
          if (field.required && field.value == null) return false;
          else return true;

        case "multiple-select-dropdown":
          if (field.required && field.selectedItems.length == 0) return false;
          else return true;

        case "email":
          if (
            field.required &&
            (field.value == undefined || field.value.length == 0)
          )
            return false;
          else if (
            !field.required &&
            (field.value == undefined || field.value.length == 0)
          ) {
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
          this.resetFields(formFields[field].fields);
        else if (formFields[field].type == "file-large")
          formFields[field].fileList = [];
        else {
          formFields[field].value = null;
        }
      }
    },

    //Conver the number to Indian Number
    convertToIndianNumber(number) {
      if (typeof number == "number") return number.toLocaleString("en-IN");
      else return parseInt(number).toLocaleString("en-IN");
    },

    //Convert to date and month
    convertToMonthDate(date) {
      return this.moment(date).format("Do MMM");
    },

    //Update coach page view
    async updateCoachView(fields) {
      //User Insights: Extacting user data for insights
      const user = await this.getUserInsights();
      this.$store.commit("updateUser", user);

      fields.isUniqueVisitor = user.isUniqueVisitor;
      fields.location = user.location;

      CoachService.UpdateCoachView(fields);
    },

    async getUserInsights() {
      var isUniqueVisitor = false;
      if (this.$cookie.get("isUniqueVisitor") == undefined) {
        isUniqueVisitor = true;
        this.$cookie.set("isUniqueVisitor", true, { expires: "1M" });
        this.$cookie.set("visitedOfferings", null, { expires: "1M" });
      }

      let userLocation = null;

      try {
        await fetch("https://api.db-ip.com/v2/free/self")
          .then((response) => response.json())
          .then((response) => {
            userLocation = response.city;
          });
      } catch {
        //Blocked by ad blocker
        userLocation = null;
      }

      const user = {
        isUniqueVisitor: isUniqueVisitor,
        location: userLocation,
      };
      return user;
    },

    //Manage cookies for offerings insights
    hasUserVisitedOffering(offeringSlug) {
      let visitedOfferings = JSON.parse(this.$cookie.get("visitedOfferings"));

      //Check if the array is empty
      if (visitedOfferings == null) {
        this.$cookie.set("visitedOfferings", JSON.stringify([offeringSlug]), {
          expires: "1M",
        });
        return false;
      }
      //Check if the slug exists in the array
      else if (visitedOfferings.indexOf(offeringSlug) < 0) {
        visitedOfferings.push(offeringSlug);
        this.$cookie.set("visitedOfferings", JSON.stringify(visitedOfferings), {
          expires: "1M",
        });
        return false;
      }
      //The slug exists and user has visited
      else {
        return true;
      }
    },

    //Check if the device is mobile
    isMobile() {
      if (window.outerWidth > 800) return false;
      else return true;
    },
  },
};
