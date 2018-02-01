import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_SURVEYS } from './types';

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

const submitSurvey = (values, history) => async (dispatch) => {
  history.push('/surveys');
  const res = await axios.post('/api/surveys', values);

  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('api/surveys');

  dispatch({
    type: FETCH_SURVEYS,
    payload: res.data
  });
};

export { fetchUser, handleToken, submitSurvey, fetchSurveys };
