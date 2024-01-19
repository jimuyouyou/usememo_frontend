import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export const logApolloDev = () => {
  loadDevMessages();
  loadErrorMessages();
};
