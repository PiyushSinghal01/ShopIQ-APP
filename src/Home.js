import React from 'react'
import HeroSection from './components/HeroSection'
import Services from './components/Services'
import Trusted from './components/Trusted'
import FeatureProduct from './components/FeatureProduct'


const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <FeatureProduct></FeatureProduct>
      <Services></Services>
      <Trusted></Trusted>
    </>
  )
}

export default Home
