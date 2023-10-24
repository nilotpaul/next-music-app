import { createId } from "@paralleldrive/cuid2";

export const useCrypto = () => {
  const uuid = createId();

  return uuid.replace(/[$@#&()|*^%!. \-]/g, "");
};
