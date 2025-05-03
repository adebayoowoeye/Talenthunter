const generateToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true, // this will make this toke inaccessible using javascript in the front end
    secure: process.env.NODE_ENV === 'PRODUCTION',
    sameSite: 'strict',
  };
  res.status(statusCode).cookie('token', token, options).json({ success: true, token, user });
};
export default generateToken;
