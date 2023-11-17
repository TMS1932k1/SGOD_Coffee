const checkFullfillOtp = (otp: Array<string | undefined>) => {
  return !otp.includes(undefined);
};

export default {checkFullfillOtp};
