const formatEmail = (email) => {
  return email.replace(/[@.]/g, "");
};

export default formatEmail;
