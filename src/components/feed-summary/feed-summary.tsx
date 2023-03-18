import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Styles from './feed-summary.module.scss';


export const FeedSummary = () => {
  const { feed, wsConnected, errorMessag } = useSelector((store: any) => store.ws);

  const [today, total, waiting, done] = useMemo(() => {
    if (!wsConnected || errorMessag === null || !feed?.orders) {
      return [0, 0, [], []];
    }
    const done: string[] = [];
    const waiting: string[] = [];

    feed.orders.forEach((o: { status: any; number: string; }) => {
      if (o.status === 'done') {
        done.push(o.number);
      } else {
        waiting.push(o.number);
      }
    });
    return [feed.totalToday, feed.total, waiting, done];
  }, [feed, errorMessag, wsConnected]);

  return (
    <div className={Styles.main + ' mt-25 ml-10'}>
      <div className={Styles.firstRow}>
        <div className={Styles.leftColumn}>
          <p className={`text text_type_main-default ${Styles.firstHeader}`}>Готовы:</p>
          <div className={Styles.leftNums}>{
            done?.slice(0, 5)?.map(s => (<p key={s} className={`text text_type_digits-default`}>{s}</p>))
          }{done?.length > 20 && '...'}</div>
        </div>
        <div className={Styles.rightColumn}>
          <p className={`text text_type_main-default ${Styles.firstHeader}`}>В работе:</p>
          <div className={Styles.nums}>{
            waiting?.map(s => (<p key={s} className={`text text_type_digits-default`}>{s}</p>))
          }</div>
        </div>
      </div>
      <div className={Styles.row + ' mt-10'}>
        <p className={`text text_type_main-default  ${Styles.header}`}>Выполнено за все время:</p>
        <p className={`text text_type_digits-large`}>{total}</p>
      </div>
      <div className={Styles.row}>
        <p className={`text text_type_main-default ${Styles.header}`}>Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large`}>{today}</p>
      </div>
    </div>
  )
}
