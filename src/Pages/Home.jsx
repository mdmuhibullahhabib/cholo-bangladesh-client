import React from 'react'
import Banner from '../Components/Banner'
import Overview from '../Components/Overview'
import Travel from '../Components/Travel'

function Home() {
  return (
    <div>
        <Banner></Banner>

        <Overview></Overview>

        <Travel></Travel>
    </div>
  )
}

export default Home;