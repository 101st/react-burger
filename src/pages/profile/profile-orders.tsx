import { FeedList } from '../../components/feed-list/feed-list';
import Styles from './profile.module.scss';

function ProfileOrders() {
  return (
    <div className={Styles.orders}>
      <FeedList />
    </div>

  )
}

export default ProfileOrders;