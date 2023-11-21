export const checkFullfillOtp = (otp: Array<string | undefined>) => {
  return !otp.includes(undefined);
};
