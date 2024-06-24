'use client'

import { useMemo, useState } from "react";
import styles from "../page.module.css";

export default function Filter({SetFilter, FilterState, Type, SetFlagFilter}: {SetFilter: any, FilterState: any, Type: any, SetFlagFilter: any}){

    const [Price , SetPrice] = useState({min: 0, max: 588});

    const [PolzunokMax , SetPolzunokMax] = useState(false);
    const [PolzunokMin , SetPolzunokMin] = useState(false);
    
    
    // const PriceMemo = useMemo(
    //     ()=>{
    //         if (Number(Price.max)-Number(Price.min)<1000) {

    //             SetPrice({min: String(Number(Price.max)-1000), max: Price.max})
    //         }
    //     }, [Price.max, Price.min]
    // )

    switch (Type) {
        case 'brand':
            return(
                <div>
                    Выберите производителя
                </div>
            )
        case 'price':
            return(
                <div className={styles.filterBack} onClick={()=>SetFlagFilter({type: null, flag: false})}>
                    <div className={styles.filterMenu} onClick={e=>e.stopPropagation()}>
                        <p>Укажите промежуток</p>
                        <p>{Math.round(Price.min*100000/588)}-{Math.round(Price.max*100000/588)} рублей</p>
                        <div className={styles.rangeBack} onMouseMove={e=>{
                            if (PolzunokMin){
                                const x = e.clientX
                                if (x>=36)
                                    SetPrice({min: x-36, max: Price.max})
                                console.log(x)
                            }
                            if (PolzunokMax) {
                                const x = e.clientX
                                if (x<=624) SetPrice({max: x-36, min: Price.min})
                                console.log(x)
                            }}}>
                            <div 
                            
                                onMouseDown={e=>{
                                    SetPolzunokMin(true)
                                    
                                }}
                                onMouseUp={e=>{
                                    SetPolzunokMin(false)
                                }}
                                style={{translate: `${Price.min}px 0px`}} className={styles.polzunokL}></div>
                            <div className={styles.range} style={{width: Price.max-Price.min+12, translate: `${Price.min}px 0px`}}></div>
                            <div 
                            onMouseDown={e=>{
                                SetPolzunokMax(true)
                                
                            }}
                            onMouseUp={e=>{
                                SetPolzunokMax(false)
                                console.log('l');
                                
                            }} style={{translate: `${Price.max-588}px 0px`}} className={styles.polzunokR}></div>
                        </div>
                        
                        <button onClick={
                            ()=>{
                                SetFlagFilter({type: null, flag: false})
                                SetFilter({...FilterState, price: Price})
                        }}>Применить</button>
                    </div>
                </div>
            )
            break;
        case 'type':
            return(
                <div>
                    Выберите тип
                </div>
            )
            break;
        case 'brand':
            return(
                <div>

                </div>
            )
            break;
    
        default:
            return(
                <span>error</span>
            )
            break;
    }

}