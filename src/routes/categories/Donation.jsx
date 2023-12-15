/* eslint-disable max-len */
import { useState } from "react";
import FilteredCardList from "../../components/cardlists/FilteredCardList";
import { SortDonateComponent } from "../../components/sortComponent/SortComponent";
import styles from "./Categories.module.scss";


export default function Donation() {
  const [sortType, setSortType] = useState("default");


  return (
    <section className={styles.cardsSectionWrapper}>
      <h1 className={styles.cardsSectionHeadline}>Донати на ЗСУ</h1>
      <p className={styles.cardsSectionText}>Цільові донати, що направляються на потреби військових підрозділів Збройних Сил України</p>
      <SortDonateComponent sortType={sortType} setSortType={setSortType} />
      <FilteredCardList property="category" value="Донат" sortType={sortType} query="Донат" />
    </section>
  );
}
