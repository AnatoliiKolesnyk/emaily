const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default emailsStr => {
  const emails = emailsStr.split(',');
  const invalidEmails = emails.filter(email => email && !emailRegExp.test(email.trim()));
  return invalidEmails.length ? `These emails are invalid: ${invalidEmails.join(', ')}` : '';
};
