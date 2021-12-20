require('dotenv').config();
import axios from 'axios';

//Importing Variable mixins
import VariablesMixins from '../mixins/Variables';
const apiURL = VariablesMixins.skipperAPIURL;

class CoachService {
    //Service to get coach
    static GetCoach(fields) {
        return new Promise((resolve, reject) => {
            resolve(
                (async() => {
                    try {
                        return await axios.post(`${apiURL}/coach/get`, {
                                fields
                            }, {
                                withCredentials: true
                            })
                            .then(response => {
                                return response.data;
                            }, (error) => {
                                console.log(error);
                                return false;
                            });
                    } catch (e) {
                        console.log('err', e);
                        reject(e);
                    }
                })()
            );
        })
    }

    static BookPlan(fields) {
        return new Promise((resolve, reject) => {
            resolve(
                (async() => {
                    try {
                        return await axios.post(`${apiURL}/coach/book-plan`, {
                                fields
                            }, {
                                withCredentials: true
                            })
                            .then((response) => {
                                return response.data;
                            }, (error) => {
                                console.log(error);
                                return false;
                            });
                    } catch (e) {
                        console.log('err', e);
                        reject(e);
                    }
                })()
            );
        })
    }

    static VerifyPayment(fields) {
        return new Promise((resolve, reject) => {
            resolve(
                (async() => {
                    try {
                        return await axios.post(`${apiURL}/coach/verify-payment`, {
                                fields
                            }, {
                                withCredentials: true
                            })
                            .then((response) => {
                                return response.data;
                            }, (error) => {
                                console.log(error);
                                return false;
                            });
                    } catch (e) {
                        console.log('err', e);
                        reject(e);
                    }
                })()
            );
        })
    }

    static FailedPayment(fields) {
        return new Promise((resolve, reject) => {
            resolve(
                (async() => {
                    try {
                        return await axios.post(`${apiURL}/coach/failed-payment`, {
                                fields
                            }, {
                                withCredentials: true
                            })
                            .then((response) => {
                                return response.data;
                            }, (error) => {
                                console.log(error);
                                return false;
                            });
                    } catch (e) {
                        console.log('err', e);
                        reject(e);
                    }
                })()
            );
        })
    }

    static GetOnlinePlan(fields) {
        return new Promise((resolve, reject) => {
            resolve(
                (async() => {
                    try {
                        return await axios.post(`${apiURL}/coach/get-plan`, {
                                fields
                            }, {
                                withCredentials: true
                            })
                            .then((response) => {
                                return response.data;
                            }, (error) => {
                                console.log(error);
                                return false;
                            });
                    } catch (e) {
                        console.log('err', e);
                        reject(e);
                    }
                })()
            );
        })
    }

    static SendMessage(fields) {
        return new Promise((resolve, reject) => {
            resolve(
                (async() => {
                    try {
                        return await axios.post(`${apiURL}/coach/send-message`, {
                                fields
                            }, {
                                withCredentials: true
                            })
                            .then((response) => {
                                return response.data;
                            }, (error) => {
                                console.log(error);
                                return false;
                            });
                    } catch (e) {
                        console.log('err', e);
                        reject(e);
                    }
                })()
            );
        })
    }

}

export default CoachService;