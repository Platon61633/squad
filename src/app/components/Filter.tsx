'use client'

import { useMemo, useState } from "react";
import styles from "../styles/filter.module.css";


export default function Filter({SetFilter, FilterState, Type, SetFlagFilter}: {SetFilter: any, FilterState: any, Type: any, SetFlagFilter: any}){

    const [Price , SetPrice] = useState({min: FilterState.price.min, max: FilterState.price.max});

    const [PolzunokMax , SetPolzunokMax] = useState(false);
    const [PolzunokMin , SetPolzunokMin] = useState(false);
    
    const [ChooseID , SetChooseID] = useState(['']);
    
    
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
                <div className={styles.brand}>
                    <h4>Выберите производителя</h4>
                    <div className={styles.list}>
                        {FilterState.brand.map((e: string, id: any)=>
                            <div key={id} style={ChooseID.includes(id)?{color: 'black', backgroundColor: 'white'}: {}} className={styles.itemBrand}
                            onClick={()=>
                                {
                                const flag = ChooseID.indexOf(id)
                                 
                                if (flag+1){
                                    console.log(flag);
                                    ChooseID.splice(flag, 1)
                                    
                                    SetChooseID([...ChooseID])
                                    
                                }
                                else{
                                    SetChooseID([...ChooseID, id])
                                }
                                
                            
                                
                                
                            }
                            }>
                                {e}
                            </div>
                        )}
                    </div>
                        
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
                                if (x>=36 && x<=624)
                                    if (Price.max-x>-32)
                                        SetPrice({min: x-36, max: Price.max})
                            }
                            if (PolzunokMax) {
                                const x = e.clientX
                                if (x<=624 && x>=36)
                                    console.log(x, Price.min);
                                    
                                    if (x-Price.min>40) SetPrice({max: x-36, min: Price.min})
                            }}}>
                            <div className={styles.left} style={{width: Price.min?Price.min+2:0}}></div>
                            <div className={styles.polzunokL} style={{translate: `${Price.min}px 0`}}
                            onMouseDown={e=>{
                                SetPolzunokMin(true)
                                
                            }}
                            onMouseUp={e=>{
                                SetPolzunokMin(false)
                            }}
                            ></div>
                            <div className={styles.polzunokR} style={{translate: `${Price.max-588}px 0`}}
                            onMouseDown={e=>{
                                SetPolzunokMax(true)
                                
                            }}
                            onMouseUp={e=>{
                                SetPolzunokMax(false)
                                console.log('l');
                                
                            }}></div>
                            <div className={styles.right} style={{width: 588-Price.max, translate: `${Price.max-588}px 0`}}></div>
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