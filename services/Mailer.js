const sgMail = require('@sendgrid/mail');
const {Mail, EmailAddress } = require('@sendgrid/helpers').classes;
const keys = require('../config/keys');

class Mailer extends Mail {
  constructor({subject, recipients}, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);

    this.from_email = new EmailAddress('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = recipients.map(
      ({email}) => new EmailAddress (email)
    );

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  addClickTracking() {
    const trackingSettings = new helper.trackingSettings();
    const clickTracking = new helper.ClickTracking();

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(
      recipient => personalize.addTo(recipient)
    );
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
