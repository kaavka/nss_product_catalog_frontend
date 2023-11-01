'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.scss';
import button from '../../styles/modules/buttons.module.scss';
import { Product } from '@/types/Product';
import { useContext } from 'react';
import { FavoritesContext } from '@/app/contexts/FavoritesContextProvider';
import classNames from 'classnames';
import { CartObject } from '@/types/CartObject';
import { CartContext } from '@/app/contexts/CartContextProvider';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { id, name, category, fullPrice, price, screen, capacity, ram, image } = product;

  const { cartItems, handleAddToCart } = useContext(CartContext);
  const { favorites, handleFavorites } = useContext(FavoritesContext);

  const handleAddItem = () => {
    const productToAdd: CartObject = {
      id,
      name,
      price,
      image,
      count: 1
    };

    handleAddToCart(productToAdd);
  };

  const isAddedInCart =  cartItems.some((item : CartObject) => item.id === id);

  return (
    <div className={styles.card}>
      <Link
        href={`/${category}/[id]`}
        as={`/${category}/${id}`}
      >
        <Image
          alt='Phone Image'
          src={`https://nss-product-catalog-api.onrender.com/${image}`}
          className={styles.card__image}
          width={250}
          height={250}
        />
      </Link>

      <span className={styles.card__name}>{name}</span>
      <div className={styles.card__prices}>
        <span className={`${styles.card__price} ${styles.card__price_new}`}>
          ${price}
        </span>
        <span className={`${styles.card__price} ${styles.card__price_old}`}>
          ${fullPrice}
        </span>
      </div>

      <hr className={styles.card__line} />

      <div className={styles.card__parameters}>
        <div className={styles.card__pair}>
          <span className={styles.card__parameter}>Screen</span>
          <span
            className={`${styles.card__parameter} ${styles.card__parameter_value}`}
          >
            {screen}
          </span>
        </div>

        <div className={styles.card__pair}>
          <span className={styles.card__parameter}>Capacity</span>

          <span
            className={`${styles.card__parameter} ${styles.card__parameter_value}`}
          >
            {capacity}
          </span>
        </div>

        <div className={styles.card__pair}>
          <span className={styles.card__parameter}>RAM</span>

          <span
            className={`${styles.card__parameter} ${styles.card__parameter_value}`}
          >
            {ram}
          </span>
        </div>
      </div>

      <div className={styles.card__buttons}>
      <button
          className={classNames(button.primary, {
            [button.primary_selected]: isAddedInCart
          })}
          onClick={handleAddItem}
        >
          {isAddedInCart
            ? 'Added'
            : 'Add to cart'
          }
        </button>

        <button
          className={classNames(button.favorite, {
            [button.favorite_selected]: favorites.includes(id),
          })}
          onClick={() => handleFavorites(id)}
        ></button>
      </div>
    </div>
  );
};
