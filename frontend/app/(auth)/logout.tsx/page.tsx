import { logOut } from '../../store/user/userAction';
import redirect from '../../utils/redirect';

const Logout = () => {
  return null;
};
Logout.getInitialProps = ({ store, res }) => {
  store.dispatch(logOut());
  redirect(res, '/login');
  return {};
};
export default Logout;
redirect :

import Router from 'next/router';

export default (res, target) => {
  if (res) {
    // server
    // 303:"see other"
    res.writeHead(302, { Location: target });
    res.end();
  } else {
    Router.push(target);
  }
};