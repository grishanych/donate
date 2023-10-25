import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeFavorites } from "../../../redux/actions/cartActions";
import FavoritesItem from "./FavoritesItem";
import { FormButton } from "../../button/Button";
import { openModal } from "../../../redux/actionsCreators/modalActionsCreators";
import Modal from "../../modal/Modal";
import styles from "./Favorites.module.scss";


function Favorites() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.favorites.items);
  const currentProducts = JSON.parse(localStorage.getItem("Favorites")) || [];
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("Favorites"));
    if (localData && !cartItems.length) {
      dispatch(initializeFavorites(localData));
    }
  }, [cartItems.length, dispatch]);

  const isFavoriteEmpty = currentProducts.length === 0;

  let modalText = '' 
  if (! isFavoriteEmpty) {
     modalText = "Ви успішно замовили товар! Дякуємо за вашу покупку. Незабаром ми з вами зв'яжемось для підтвердження деталей доставки та оплати. Гарного дня!"
  } else {
      modalText = "Здається, ви забули вибрати товар для покупки. Будь ласка, оберіть товар, який вас цікавить, і натисніть 'Купити'."
  }


  return (
    <div className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Обрані товари</h1>
      <p className={styles.cardsSectionText}>Ваші обрані товари</p>

      {isFavoriteEmpty ? <p className={styles.favoriteEmpty}>Ви ще не додали жодного товару</p>
        : (
          <ul className={styles.cardsListWrapper}>
            {currentProducts.map((item) => (
              <FavoritesItem
                key={item.itemNo}
                item={item}
              />
            ))}
          </ul>
        )}
        {isModalOpen && ( 
        <Modal tittle={modalText} />
       )}
        <FormButton text="Купити" padding="10px" onClick={() => { dispatch(openModal()) }} />
    </div>
  );
}

export default Favorites;
