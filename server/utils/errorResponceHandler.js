export const responce = (res, status, message) => {
  res.status(status);
  throw Error(message);
};
