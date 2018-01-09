const sgMail = require('@sendgrid/mail');
const {Mail, EmailAddress, Personalization} = require('@sendgrid/helpers').classes;
const keys = require('../config/keys');

class Mailer extends Mail {
  constructor({subject, recipients}, content) {
    // console.log(JSON.stringify(arguments, null, 2));
    super();

    this.sgApi = sgMail;
    this.sgApi.setApiKey(keys.sendGridKey);

    this.from = new EmailAddress('no-reply@emaily.com');
    this.setSubject(subject);
    this.addHtmlContent(content);
    this.recipients = recipients.map(
      ({email}) => {
        return new EmailAddress({email})
      }
    );
    console.log(`${ JSON.stringify(this.recipients, null, 2) }`);

    this.addClickTracking();
    this.addRecipients();
  }

  addClickTracking() {
    const trackingSettings = {
      clickTracking: {
        enable: true,
        enableText: true
      }
    };
    this.setTrackingSettings(trackingSettings);
  }

  addRecipients() {
    this.recipients.forEach(
      recipient => this.addPersonalization(
        new Personalization({to: [recipient]})
      )
    );
  }

  send() {
    return this.sgApi.send(this);
  }
}

module.exports = Mailer;
