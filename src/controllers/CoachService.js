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
                (async () => {
                    try {
                        return await axios.post(`${apiURL}/coach/get`, {
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
                (async () => {
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

}

export default CoachService;