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
  const [orders, setOrders] = useState([]);

  const { feed, wsConnected } = useAppSelector((store: any) => store.ws);

  useEffect(() => {
    if (!wsConnected) {
      dispatch(getWsConnectionStartAction(WS_ORDER_URL + '/all'));
    }
  }, [dispatch, wsConnected]);

  useEffect(() => {
    if (location.pathname === '/profile/orders' && feed) {
      setOrders(feed.orders.filter((order: TOrder) => {
        console.log(order);
        return order;
      }))
    } else {
      setOrders(feed?.orders || [])
    }
  }, [feed])

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