import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { Card } from './Card.js'

const style = {
    width: 100,
}

export const Container = ({ assets }) => {
    // {
        const [cards, setCards] = useState();
        // const [cards, setCards] = useState([
        //     {
        //         id: 1,
        //         text: 'Write a cool JS library',
        //     },
        //     {
        //         id: 2,
        //         text: 'Make it generic enough',
        //     },
        //     {
        //         id: 3,
        //         text: 'Write README',
        //     },
        //     {
        //         id: 4,
        //         text: 'Create some examples',
        //     },
        //     {
        //         id: 5,
        //         text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        //     },
        //     {
        //         id: 6,
        //         text: '???',
        //     },
        //     {
        //         id: 7,
        //         text: 'PROFIT',
        //     },
        // ])
        const moveCard = useCallback((dragIndex, hoverIndex) => {
            setCards((prevCards) =>
                update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex]],
                    ],
                }),
            )
        }, [])
        const renderCard = useCallback((key, i) => {
            return (
                <Card
                    key={key}
                    index={i}
                    id={key}
                    text={assets[key].title}
                    moveCard={moveCard}
                />
            )
        }, [])
        return (
            <>
                <div style={style}>{Object.keys(assets).map((key, i) => renderCard(key, i))}</div>
            </>
        )
    // }
}


