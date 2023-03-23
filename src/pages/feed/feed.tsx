import Styles from './feed.module.scss';
import { FeedSummary } from '../../components/feed-summary/feed-summary';
import { FeedList } from '../../components/feed-list/feed-list';

export const Feed = () => {
  return (
    <div className={Styles.container}>
      <div>
        <h1 className='mt-10'>Лента заказов</h1>
        <div className={Styles.list}>
          <FeedList />
        </div>
      </div>
      <div className={Styles.status}>
        <FeedSummary />
      </div>
    </div>
  );
}