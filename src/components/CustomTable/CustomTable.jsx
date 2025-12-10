import React, {useEffect, useState, useContext} from 'react'

import Context from '../Context';

import style from './CustomTable.module.css';

const CustomTable = ({ headerConfig, items, minWidthPerColumn}) => {

  const [gridTemplateColumnsForMobile, setGridTemplateColumnsForMobile] = useState('')

  useEffect(() => {
    if(items) {
      let newGridTemplateColumnsForMobile = '100px';
      for(let item of items) {
        console.log(item.name.length, item.name)
        newGridTemplateColumnsForMobile = `${newGridTemplateColumnsForMobile} ${item.name.length * 12}px`
      }
      setGridTemplateColumnsForMobile(newGridTemplateColumnsForMobile);
    }
  }, [items])

  const { isMobile } = useContext(Context);
  return (
    <div 
      className={style.container} 
      style={isMobile ? {gridTemplateRows: `repeat(${headerConfig.length}, 80px)`, gridTemplateColumns: gridTemplateColumnsForMobile} : { gridTemplateColumns: `repeat(${headerConfig.length}, 1fr)`}}
    >
            {headerConfig.map( it => <div className={style.header}> {it.label} </div>)}
            {items.map( (item, i) => {
                const itemProperties = [];
                for( let it of headerConfig) {
                    itemProperties.push(<div className={ i % 2 === 0 ? style.background : ''}> {item[it.id]} </div>)
                }
                return itemProperties;
            })}
    </div>
  )
}

export default CustomTable;
