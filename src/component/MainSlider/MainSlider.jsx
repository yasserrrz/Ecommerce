import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Img1 from '../../assets/pexels-erik-mclean-8266863.jpg'
import Img2 from '../../assets/pexels-karolina-grabowska-4041392.jpg'
import Img3 from '../../assets/pexels-laryssa-suaid-1667071.jpg'
import Img4 from '../../assets/pexels-laryssa-suaid-1667088.jpg'
import Img5 from '../../assets/pexels-laryssa-suaid-3616991.jpg'
import Img6 from '../../assets/pexels-nora-topicals-7038219.jpg'
import Img7 from '../../assets/pexels-rfstudio-3621234.jpg'

export default function MainSlider() {
    return (<div className='row mt-2'>
    <div className="col-md-9 ">
    <OwlCarousel className='owl-theme' autoplay loop items={1}>
      <img src={Img6}  height={400}  className="w-100 " alt="" />
      <img src={Img3}  height={400}  className="w-100 " alt="" />
      <img src={Img4}  height={400}  className="w-100 " alt="" />
      <img src={Img5}  height={400}  className="w-100 " alt="" />
      <img src={Img1}  height={400}  className="w-100 " alt="" />
    </OwlCarousel>
    </div>
    <div className="col-md-3 fixedMain ">
    <img src={Img7} height={200} className="w-100" alt="" />
    <img src={Img6} height={200} className="w-100" alt="" />
    </div>
  </div>
  )
}
