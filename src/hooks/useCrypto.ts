export const useCrypto = () => {
  const uuid = crypto.randomUUID().replace(/[$@#&()|*^%!. \-]/g, "");

  return uuid;
};
