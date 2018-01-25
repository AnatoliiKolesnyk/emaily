import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import {submitSurvey} from '../../actions';

class FormReview extends Component {
  onSubmit() {
    this.props.submitSurvey();
    this.props.destroy();
  }

  render() {
    return (
      <form onSubmit={ this.props.handleSubmit(this.onSubmit.bind(this)) }>
        <h5>Please confirm your entries</h5>
        <div>
          <div>
            <label>Survey Title</label>
            <div>{this.props.title}</div>
          </div>
        </div>
        <div>
          <div>
            <label>Survey Subject</label>
            <div>{this.props.subject}</div>
          </div>
        </div>
        <div>
          <div>
            <label>Survey Body</label>
            <div>{this.props.body}</div>
          </div>
        </div>
        <div>
          <div>
            <label>Survey Recipients</label>
            <div>{this.props.recipients}</div>
          </div>
        </div>

        <button className="yellow darken-3 white-text btn-flat"
                onClick={this.props.handleSubmit(this.props.onCancel)}>
          Back
        </button>
        <button type="submit"
                className="green btn-flat right white-text">
          SendSurvey
          <i className="material-icons right">email</i>
        </button>
      </form>
    );
  }
};

const selector = formValueSelector('surveyForm');

export default connect(
  state => selector(state, 'title', 'subject', 'body', 'recipients'),
  {submitSurvey}
)(reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FormReview));
