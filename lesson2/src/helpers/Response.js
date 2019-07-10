export const responseError = (e) => (
  JSON.stringify({
    message: 'please provide valid arguments',
    description: `${e}`
  })
);

export const responseSum = (answer) => (
  JSON.stringify({
    answer,
  })
);

export const responseMessage = (message = '') => (
  JSON.stringify({
    message: message,
  })
);
