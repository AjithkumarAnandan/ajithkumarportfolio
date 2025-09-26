import { getFetchProducts } from "../crud/redux.action";
import { reduxstore } from "../store";
import { getFeedback } from "./dashboard.action";

export async function getServerSideProducts() {
  const store = reduxstore();
  await store.dispatch(getFetchProducts());
  const state = store.getState().dashboard;

  return {
    dashboard: state,
  };
}

export async function getServerSideFeedback() {
  const store = reduxstore();
  await store.dispatch(getFeedback());
  const state = store.getState().feedback;

  return {
    feedback: state,
  };
}
