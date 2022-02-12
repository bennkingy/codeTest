import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as Badge } from '../../images/Badge_Bookonline.svg'

// Styling

let grey ='rgb(45, 55, 72)';

export const H1 = styled.h1`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 34px;
  font-weight: 300;
  color: #1a202c;
  text-decoration-color: rgb(26, 32, 44);
  margin-left: 20px;
`
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0 10px;
  @media screen and (max-width: 576px) {
    flex-direction: column;
  }
`
export const Card = styled.div`
  flex: 1 0 calc(25% - 20px);
  margin: 10px;
  cursor: pointer;
  @media screen and (max-width: 992px) {
    flex: 1 0 calc(50% - 20px);
  }
  :hover h3 {
    color: #70d200
  }
`
export const Divider = styled.hr` 
  border-color: #e2e8f0!important;
  display: block;
  flex: 1 1 0px;
  max-width: 100%;
  height: 0;
  max-height: 0;
  border: solid;
  border-width: thin 0 0;
  margin-top: 10px;
  margin-bottom: 15px;
`
export const StarRating = styled.div`
  display: inline-block;
  margin-bottom: 10px;
  > span   {
    color: #ffc107;
  }
`
export const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
export const Img = styled.img`
  width: 100%;
  border-radius: 3px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 15px;
`
export const Location = styled.span`
  color: #4a5568;
  margin-top: 4px;
  margin-left: 0;
  font-size: 12px;
  font-weight: 600;
  font-family: Open Sans,sans-serif;
  width: auto;
  margin-bottom: 10px;
  display: block;
  text-transform: uppercase;
`
export const CardTitle = styled.h3`
  font-family: Open Sans,sans-serif;
  color: #2d3748;
  font-weight: 700;
  margin: 0;
  display: inline;
  margin-right: 5px;
  margin-bottom: 10px;
`
export const Price = styled.span`
  color: ${grey};
  font-family: "Open Sans", sans-serif;
  font-size: 28px;
  font-weight: 600;
  letter-spacing -1px;
  line-height: 25.6px;
  margin-bottom: 0px;
  word-break: normal;
`
export const PriceSuffix = styled.span`
  color: ${grey};
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: normal;
  padding-left: 1px;
`
export const From = styled.span`
  color: ${grey};
  font-size: 10px;
  display: block;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 5px;
`
export const Desc = styled.span`
  color: ${grey};
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  line-height: 22.4px;
  display: block;
  margin-bottom: 10px;
`

// APIs

const getHolidays = () => { 
  return axios.get('/api')
    .then(res => {
      return res.data.product_lists[0]
    })
    .catch(err => {
      console.log(err)
    });
}

// Component

export default function BestSelling() {

  const [holidayData, setHolidayData] = useState('')

  useEffect(() => {
    getHolidays().then(holidays => {
      setHolidayData(holidays || '')
    })
  }, [])

  return (
    <>
      { holidayData ? ( 
        <>
        <H1>{holidayData.title}</H1>
          <Container>
            { holidayData.items.map((i) => (
              <Card key={nanoid()}>
                <Img src={i.image.file.url} alt={i.image.title} />
                <Location>{i.parent_location}</Location>
                <Section>
                  <CardTitle>{i.full_name}</CardTitle>
                  <StarRating>
                    { new Array(i.data[0].venue_information.official_star_rating).fill().map(() => (
                      <span key={nanoid()}><FontAwesomeIcon icon={faStar}/></span>
                    ))}
                  </StarRating>
                </Section>
                <Divider/>
                { i.lead_product.badge ? <Badge width={50} style={{float: "right"}}/> : '' }
                <Desc>{i.lead_product.nights} night & {i.lead_product.rounds} rounds</Desc>
                <From>from</From>
                <Price>£{i.lead_product.price}<PriceSuffix>pp</PriceSuffix></Price>
              </Card>
              ))
            }

          </Container>
        </>
      ) : <H1>Loading...</H1> }
    </>
  )
  
}