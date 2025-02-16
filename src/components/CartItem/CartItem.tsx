import styles from './CartItem.module.scss';
import Image from 'next/image';
import phoneImage from '../ProductCard/phoneImage.png';
import { CartObject } from '@/types/CartObject';

type Props = {
  cartObject: CartObject;
};

export const CartItem: React.FC<Props> = ({ cartObject }) => {
  const {
    id,
    image,
    name,
    price,
    count,
  } = cartObject;

  return (
    <div className={styles.item}>
      <div className={styles.item__group}>
        <span
          className={`${styles.item__icon} ${styles.item__icon_close}`}
        ></span>
        <Image
          alt='Phone Image'
          src={`https://nss-product-catalog-api.onrender.com/${image}`}
          className={styles.item__image}
          width={66}
          height={66}
        />
        <span className={styles.item__text}>
          {name}
        </span>
      </div>

      <div className={styles.item__pair}>
        <div className={styles.item__group}>
          <span
            className={`${styles.item__icon} ${styles.item__icon_minus} ${styles.item__icon_border}`}
          ></span>
          <span className={styles.item__text}>
            {count}
          </span>
          <span
            className={`${styles.item__icon} ${styles.item__icon_plus} ${styles.item__icon_border}`}
          ></span>
        </div>

        <span className={styles.item__price}>${price}</span>
      </div>
    </div>
  );
};
