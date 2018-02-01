const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('Survey');

module.exports = app => {
  app.get('//api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!')
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);

    const events = req.body.reduce((res, {url, event, email}) => {
      if (event !== 'click') {
        return res;
      }
      const match =  url.match(/\/api\/surveys\/(.+?)\//);
      const surveyId = match && match[1];
      if (!surveyId) {
        return res;
      }
      const duplicateEvent = res.find(event => {
        return event.email === email && event.surveyId === surveyId
      });
      if (duplicateEvent) {
        return res;
      }
      res.push({
        email: email,
        surveyId,
        choise: url.includes('/yes') ? 'yes' : 'no',
      });
      return res;
    }, []);

    console.log(events);

    for (const {surveyId, email, choise} of events) {
      Survey.updateOne({
        _id: surveyId,
        recipients: {
          $elemMatch: {email: email, responded: false}
        }
      }, {
        $inc: {[choise]: 1},
        $set: {'recipients.$.responded': true},
        lastResponded: new Date(),
      })
      .exec();
    }

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {title, subject, body, recipients} = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map( email => ( {email: email.trim()} ) ),
      _user: req.user._id,
      dateCreated: new Date(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (e) {
      res.status(422).send(err);
    }
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey
      .find({_user: req.user.id})
      .select('-recipients');

    res.send(surveys);
  });
};
