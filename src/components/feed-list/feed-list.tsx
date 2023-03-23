import { FeedItem } from '../feed-item/feed-item';
import { TOrder } from '../../services/reducers/order.types';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Styles from './feed-list.module.scss';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getWsConnectionClosedAction, getWsConnectionStartAction } from '../../services/actions/ws';
import { WS_ORDER_URL } from '../../utils/const';

export const FeedList = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<TOrder[]>([]);

  const { commonFeed, userFeed } = useAppSelector(store => store.ws);

  useEffect(() => {

    if (location.pathname === '/feed') {
      dispatch(getWsConnectionStartAction(WS_ORDER_URL + '/all'));
    }

    if (location.pathname === '/profile/orders') {
      dispatch(getWsConnectionStartAction(WS_ORDER_URL, true));
    }

    return () => {
      dispatch(getWsConnectionClosedAction());
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (location.pathname === '/feed' && commonFeed) {
      setOrders(commonFeed?.orders)
    }

    if (location.pathname === '/profile/orders' && userFeed) {
      setOrders(userFeed?.orders)
    }
  }, [commonFeed, userFeed, location.pathname]);

  return (
    <ul>
      {orders.map((order: TOrder) => (
        <Link className={Styles.link} key={order._id}
          to={{ pathname: `${location.pathname}/${order._id}`, state: { background: location } }} >
          <FeedItem order={order} />
        </Link>
      ))}
    </ul>
  );
};