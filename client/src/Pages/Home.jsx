import Hero from '../Components/Home/Hero'
import SignParent from '../Components/Home/SignParent'
import SignCreche from '../Components/Home/SignCreche'
import Cards from '../Components/Home/Cards'
import Testimonials from '../Components/Home/Testimonials'
import Question from '../Components/Home/Question'

const Home = () => {
  return (
    <div className='mt-20 md:mt-32'>
      <Hero/>
      <SignParent/>
      <SignCreche/>
      <Cards/>
      <Testimonials/>
      <Question/>
    </div>
  )
}

export default Home