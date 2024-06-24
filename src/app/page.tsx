'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import Filter from "./components/Filter";

export default function Home() {


  const [Showcase , SetShowcase] = useState([{
    name: null,
    desc: null,
    type: null,
    brand: null,
    country: null,
    price: null,
    img: null,
  }]);

  const [FilterState , SetFilter] = useState<any>({price: null, type: null, brand: null});
  const [FlagFilter , SetFlagFilter] = useState<any>({type: null, flag: false});
  
  
  
  useEffect(()=>{
    axios.get('https://tyt-kappa.vercel.app/?showcase=key')
    .then(e=>SetShowcase(e.data))
  }, [])

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src="./dollar.jpg" alt="" width={150}/>
          </div>
          <div className={styles.brandName}>
            Brand
          </div>
          <div className={styles.vertLine}>

          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.itemHeader}>
            Корзина
          </div>
          <div className={styles.itemHeader}>
            Категории
          </div>
          <div className={styles.itemHeader}>
            О нас
          </div>
          <div className={styles.itemHeader}>
            Контакты
          </div>
        </div>
      </header>
      <main>
        {FlagFilter.flag? 
          <Filter SetFilter={SetFilter} FilterState={FilterState} SetFlagFilter={SetFlagFilter} Type={FlagFilter.type}/>
        :
        null}
        <div className={styles.filter}>
          <div className={styles.itemFilter} onClick={e=>{
            SetFlagFilter({type: 'price', flag: true})
          }}>
            Цена
          </div>
          <div className={styles.itemFilter} onClick={e=>{
            SetFlagFilter({type: 'brand', flag: true})
          }}>
            Производитель
          </div>
          <div className={styles.itemFilter} onClick={e=>{
            SetFlagFilter({type: 'type', flag: true})
          }}>
            Тип
          </div>
          <div className={styles.itemFilter} onClick={e=>{
            SetFlagFilter({type: 'price', flag: true})
          }}>
            Прочие хараткеристики
          </div>
        </div>
        <div className={styles.showcase}>
          {Showcase.map((e, id)=>
            <div key={id} className={styles.itemShowcase}>
              <img src={'https://images-one-chi.vercel.app/'+e.img} alt="" width={200}/>
              <div className={styles.name}>
                {e.name}
              </div>
              <div className={styles.price}>
                {e.price}
              </div>
            </div>
          )}
        </div>
      </main>
      <div onClick={()=>console.log(FilterState)
      }>nnnnnnnnn</div>
    </div>
  );
}
