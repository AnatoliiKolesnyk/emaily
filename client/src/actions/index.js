import axios from 'axios';
import { FETCH_USER, SUBMIT_SURVEY } from './types';

const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/current_user');

  dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};

const handleToken = (token) => async (dispatch) => {
  const response = await axios.post('/api/stripe', token);

  dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};

const submitSurvey = (values) => async (dispatch) => {
  dispatch({
    type: SUBMIT_SURVEY,
    payload: ''
  });
};

export { fetchUser, handleToken, submitSurvey };
