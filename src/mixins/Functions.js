//Importing AuthService for Logout
// import CoachService from "@/controllers/CoachService";

//Importing libraries
import moment from 'moment';
import _ from "lodash";

export default {
    methods: {
        getCoach() {
            if (_.isEmpty(this.$store.coach)) {
                // const coach = await CoachService.GetCoach(slug);
                const coach = {
                    name: "Charan Tej",
                    gender: "male",
                    yearsOfExperience: 4,
                    noOfClientsTrained: 78,
                    contact: {
                        email: "kscharantej@gmail.com",
                        phoneNumber: "9704243884",
                    },
                    profileImageURL: "https://i.ibb.co/R6Nc1Zp/profile.jpg",
                    socialHandles: [{
                            platform: "instagram",
                            link: "https://www.instagram.com/dantes_club/",
                        },
                        {
                            platform: "youtube",
                            link: "https://www.youtube.com/user/barelifenutrition",
                        },
                        {
                            platform: "facebook",
                            link: "https://www.facebook.com/Dantesfitnessclub/",
                        },
                        {
                            platform: "whatsapp",
                            link: "https://wa.me/+919740243884",
                        },
                    ],
                    languagesKnown: "English, हिंदी, ಕನ್ನಡ",
                    plans: [{
                            title: "1-on-1 Personal Training",
                            price: 5500,
                            coverImageURL: "https://i.ibb.co/W5VNywP/plan-1.jpg",
                            type: "plan",
                            frequency: "monthly",
                            tags: "popular",
                        },
                        {
                            title: "30 Day Fat Loss Challenge",
                            price: 3500,
                            coverImageURL: "https://i.ibb.co/SrSSGjv/plan-2.jpg",
                            type: "challenge",
                            frequency: "scheduled",
                            startDate: "2021-07-01T16:00:00Z",
                            endDate: "2021-07-30T16:00:00Z",
                        },
                    ],
                    specialities: [{
                            title: "Weight Loss",
                            iconURL: "weight-loss.svg",
                        },
                        {
                            title: "General Fitness",
                            iconURL: "cardio.svg",
                        },
                        {
                            title: "Muscle Building",
                            iconURL: "muscle.svg",
                        },
                    ],
                    workoutCategories: [
                        "Strength & Conditioning",
                        "Weight Training",
                        "HIIT",
                    ],
                    coverImage: {
                        url: "https://skippr.s3.ap-south-1.amazonaws.com/profile-pic.jpg",
                    },
                    galleryImages: [{
                        url: "https://skippr.s3.ap-south-1.amazonaws.com/Gallery_6_7422a22a14.jpg"
                    }, {
                        url: "https://skippr.s3.ap-south-1.amazonaws.com/Gallery_8_7781997d19.jpg"
                    }, {
                        url: "https://skippr.s3.ap-south-1.amazonaws.com/Gallery_7_017a647825.jpg"
                    }, {
                        url: "https://skippr.s3.ap-south-1.amazonaws.com/Gallery_1_64e3cc7f4e.jpg"
                    }, {
                        url: "https://skippr.s3.ap-south-1.amazonaws.com/Gallery_10_b1ef9eb60d.jpg"
                    }],
                    heroData: {
                        title: "Charan Tej",
                        description: "Body Transformation Specialist & Athlete 💪",
                    },
                    about: {
                        description: "Charan is a total beast of an athlete. His personal training clients have all seen spectacular results 💪 Charan works well with people who are beginners, intermediates as well as advanced.",
                        coverImageURL: "https://i.ibb.co/N7BN0Qm/cover-iamge.jpg",
                        coverVideoURL: "https://a.uguu.se/OVsynkac.mp4",
                    },
                    transformations: [{
                            name: "Marty C",
                            description: "Age: 20s, Independent Consultant",
                            testimonial: "As you can see, it's been one hell of a journey with Charan. What I loved the most about training with him was that he never let me give up. He taught me how to push my self to my boundaries and achieve the results I want. ",
                            imageURL: "https://skippr.s3.ap-south-1.amazonaws.com/Charan_3_8f18dbc687.jpg",
                        },
                        {
                            name: "Benjamin D",
                            description: "Age: 20s, Finance Consultant",
                            testimonial: "The transformation picture says it all. I don't need to emphasise on how good a trainer Charan is. He has completely changed my life and how I approach my lifestyle now. Thanks Charan!",
                            imageURL: "https://skippr.s3.ap-south-1.amazonaws.com/Charan_2_c755eb621c.jpg",
                        },
                        {
                            name: "Varun M",
                            description: "Age: 30s, Sales Executive",
                            testimonial: "Charan not only gave me fitness coaching, but also helped me watch my diet. He provided a detailed diet plan which was sustainable and easy to follow. The process can be hard sometimes but he made sure I was motived throughout and didn't give up. Training with him was the best decision I've made.",
                            imageURL: "https://skippr.s3.ap-south-1.amazonaws.com/Charan_1_607cc2fd06.jpg",
                        },
                    ],
                    qualifications: [{
                        type: "Certification",
                        title: "Crossfit Level 1",
                    }, ],
                    promotion: {
                        text: "⚡ Join my 30 Day Fat Loss programme ⚡",
                        link: "#",
                    },
                };

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