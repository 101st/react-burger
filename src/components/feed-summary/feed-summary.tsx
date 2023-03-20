import { useEffect, useState } from 'react';
import { TOrder } from '../../services/reducers/order.types';
import { useAppSelector } from '../../utils/hooks';
import Styles from './feed-summary.module.scss';

const MAX_DISPLAYED_ITEM = 13;

export const FeedSummary = () => {
  const { feed, wsConnected } = useAppSelector(store => store.ws);
  const [done, setDone] = useState<number[]>([]);
  const [waiting, setWaiting] = useState<number[]>([]);

  useEffect(() => {
    if (!wsConnected || !feed?.orders) return;
    const done: number[] = [];
    const waiting: number[] = [];

    feed.orders.forEach((o: TOrder) => {
      if (o.status === 'done') {
        done.push(o.number);
      } else {
        waiting.push(o.number);
      }
    });
    setDone(done)
    setWaiting(waiting)
  }, [feed, wsConnected])

  return (
    <div className={Styles.main + ' mt-25 ml-10'}>
      <div className={Styles.firstRow}>
        <div className={Styles.leftColumn}>
          <p className={`text text_type_main-default ${Styles.firstHeader}`}>Готовы:</p>
          <div className={Styles.leftNums}>{
            done?.slice(0, MAX_DISPLAYED_ITEM)?.map(s => (<p key={s} className={`text text_type_digits-default`}>{s}</p>))
          }{done?.length > MAX_DISPLAYED_ITEM && '...'}</div>
        </div>
        <div className={Styles.rightColumn}>
          <p className={`text text_type_main-default ${Styles.firstHeader}`}>В работе:</p>
          <div className={Styles.nums}>{
            waiting?.slice(0, MAX_DISPLAYED_ITEM).map(s => (<p key={s} className={`text text_type_digits-default`}>{s}</p>))
          }{done?.length > MAX_DISPLAYED_ITEM && '...'}</div>
        </div>
      </div>
      <div className={Styles.row + ' mt-10'}>
        <p className={`text text_type_main-default  ${Styles.header}`}>Выполнено за все время:</p>
        <p className={`text text_type_digits-large`}>{feed?.total}</p>
      </div>
      <div className={Styles.row}>
        <p className={`text text_type_main-default ${Styles.header}`}>Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large`}>{feed?.totalToday}</p>
      </div>
    </div>
  )
}
