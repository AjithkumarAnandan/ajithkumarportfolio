import { getFetchProducts } from "../crud/redux.action";
import { reduxstore } from "../store";

export async function getServerSideProducts() {
  const store = reduxstore();
  await store.dispatch(getFetchProducts());
  const state = store.getState().dashboard;

  return {
    dashboard: state,
  };
}
