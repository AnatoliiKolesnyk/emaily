import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

class SurveyForm extends Component {
  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div>
        <label>{label}</label>
        <input {...input}
               placeholder={label}
               type={type}
               style={ {marginBottom: '5px'} } />
        <div className="red-text"
             style={ {marginBottom: '20px'} }>
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );
  }

  renderFields() {
    return (
      <div>
        <Field
           name="title"
           type="text"
           component={this.renderField}
           label="Survey Title"
         />
         <Field
            name="subject"
            type="text"
            component={this.renderField}
            label="Subject Line"
          />
          <Field
             name="body"
             type="text"
             component={this.renderField}
             label="Email body"
           />
           <Field
              name="recipients"
              type="text"
              component={this.renderField}
              label="Recipient List"
            />
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(v => console.log(v))}>
          {this.renderFields()}
          <Link to="/surveys"
                className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit"
                  className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validateForm(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  if (!values.subject) {
    errors.subject = 'Subject is required';
  }
  if (!values.body) {
    errors.body = 'Email body is required';
  }

  if (!values.recipients) {
    errors.recipients = 'Recipients are required';
  }

  if (values.recipients) {
    errors.recipients = validateEmails(values.recipients);
  }
  return errors;
}

export default reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateForm,
})(SurveyForm);
