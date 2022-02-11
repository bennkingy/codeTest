import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// Styling

export const Divider = styled.hr` 
  display: block;
  flex: 1 1 0px;
  max-width: 100%;
  height: 0;
  max-height: 0;
  border: solid;
  border-width: thin 0 0;
  margin: 0px;
`

export const Badge = styled.div` 
  background-image: url('../components/images/Badge_Bookonline.svg') 
  width: 50px;
`
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
export const StarRating = styled.div`
  display: inline-block;
  > * {
    color: #ffc107;
  }
`
export const Section = styled.div`
  display: flex;
`
export const Card = styled.div`
  flex: 25%;
  padding: 20px;
  @media screen and (max-width: 992px) {
      flex: 50%;
  }
  :hover h3 {
    color: #70d200
  }
`
export const Img = styled.img`
  width: 100%;
  border-radius: 3px;
  height: 200px;
  object-fit: cover;
`
export const Title = styled.h1`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 34px;
  font-weight: 300;
  color: #1a202c;
  text-decoration-color: rgb(26, 32, 44);
  max-width: 1200px;
  margin: 0 auto;
`
export const Location = styled.span`
  color: #4a5568;
  margin-top: 4px;
  margin-left: 0;
  font-size: 12px;
  font-weight: 600;
  font-family: Open Sans,sans-serif;
  width: auto;
  text-align: center;
  text-transform: uppercase;
`
export const CardTitle = styled.h3`
  font-family: Open Sans,sans-serif;
  color: #2d3748;
  font-weight: 700;
  margin: 0;
  display: inline;
`
export const Price = styled.span`
  color: rgb(45, 55, 72);
  font-family: "Open Sans", sans-serif;
  font-size: 32px;
  font-weight: 600;
  letter-spacing -1px;
  line-height: 25.6px;
  margin-bottom: 0px;
  word-break: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`
export const Price2 = styled.span`
  color: rgb(45, 55, 72);
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 22.4px;
`

// APIs

const getHolidays = () => { 
  return axios.get('/api')
    .then(res => {
      console.log(res.data.product_lists[0])
      return res.data.product_lists[0]
    })
    .catch(err => {
      console.log(err)
    });
}

// Component

export default function Widget() {

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
          <Container>
            {holidayData.items.map((i) => (
              <Card key={nanoid()}>
                <Img 
                  src={i.image.file.url}
                  alt="hello"
                />
                <Location>{i.parent_location}</Location>
                <Section>
                  <CardTitle>
                    {i.full_name}
                      <StarRating>
                      {new Array(i.data[0].venue_information.official_star_rating).fill(null).map(() => (
                      <FontAwesomeIcon icon={faStar} />
                      ))}
                    </StarRating>
                  </CardTitle>
                </Section>
                <Badge/>
                <Divider/>
                <p>From</p>
                <Price>£{i.lead_product.price}pp</Price>
                <p>{i.lead_product.nights} night & {i.lead_product.rounds} rounds</p>
              </Card>
            ))}
          </Container>
        </>
      ) : <p>Loading....</p> }
    </>
  )
  
}