import React from 'react'
import Hero from '../components/Hero'
import Features from './Features'
import Pricing from './Pricing'
import CTA from '../components/Cta'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Features/>
        <Pricing/>
        <CTA />
    </div>
  )
}

export default Home