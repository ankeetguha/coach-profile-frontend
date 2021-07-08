require('dotenv').config();
import axios from 'axios';

//Importing Variable mixins
import VariablesMixins from '../mixins/Variables';
const apiURL = VariablesMixins.skipperAPIURL;

class CoachService {
    //Service to register a new user
    static GetCoach() {
        return new Promise((resolve, reject) => {
            resolve(
                (async () => {
                    try {
                        return await axios.get(`${apiURL}/coach/`, {
                                withCredentials: true
                            })
                            .then((response) => {
                                return response.data.coach;
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