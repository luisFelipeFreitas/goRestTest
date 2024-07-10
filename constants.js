
const todos = {
    id: val => typeof val === 'number' && Number.isInteger(val),
    user_id: val => typeof val === 'number' && Number.isInteger(val),
    title: val => typeof val === 'string',
    due_on: val => isValidDate(val),
    status: val => typeof val === 'string' && ['completed', 'pending'].includes(val)
  };
  
  function isValidDate(dateString) {
    // Example simple date-time format validation, adjust as per your needs
    return !isNaN(Date.parse(dateString));
  }
  
  module.exports = todos;
  