import React from 'react'
import styled from 'styled-components'

interface Props {
  children: JSX.Element,
  bgColor?: string;
  color?: string;
  borderColor?: string;
}

const Card = styled.div<Props>`
  padding: 32px 24px;
  border-radius: 20px;
  line-height: 28px;
  
  svg {
    display: block;
    margin-bottom: 20px;
  }

  background: linear-gradient(154.16deg, ${props => props.bgColor} 7.85%, #FFFFFF 91.03%);
  border: 1px solid ${props => props.borderColor};
  color: ${props => props.color};
`

const DetailCard = ({ children, color = 'var(--darkGray)', bgColor = 'white', borderColor = 'var(--darkGray)' }: Props) => {

  return (
    <Card color={color} bgColor={bgColor} borderColor={borderColor} >
      { children }
    </Card>
  )
}

export default DetailCard;
