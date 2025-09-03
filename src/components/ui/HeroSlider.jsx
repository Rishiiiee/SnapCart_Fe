import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { Link } from "react-router-dom"

const slides = [
  {
    id: 1,
    image:
      "https://www.myntraglobal.com/cdn/shop/files/HPW_-_Embroidered_Kurta_Sets_c12616bd-eb5b-45ed-a321-e641426bdd85.jpg?v=1749451360&width=1600",
    link: "/products?category=Footwear",
    title: "Flat 50% Off",
  },
  {
    id: 2,
    image:
      "https://www.myntraglobal.com/cdn/shop/files/HPW_-_Asymmetrical_Hems.jpg?v=1741844959&width=1600",
    link: "/products?category=New",
    title: "New Arrivals",
  },
  {
    id: 3,
    image:
      "https://www.myntraglobal.com/cdn/shop/files/HPW_-_Hyper_Utility_Fits_ca2e0206-f39f-4efe-a5a0-a8c01fe30ab8.jpg?v=1749461379&width=1600",
    link: "/products?category=Premium",
    title: "Premium Collection",
  },
]

function AutoplaySlider(ms = 3000) {
  return (slider) => {
    let timeout
    let mouseOver = false

    function clearNextTimeout() {
      clearTimeout(timeout)
    }

    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        slider.next()
      }, ms)
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })
    slider.on("dragStarted", clearNextTimeout)
    slider.on("animationEnded", nextTimeout)
    slider.on("updated", nextTimeout)
  }
}

export default function HeroSlider() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      duration: 1000,
      slides: { perView: 1 },
    },
    [AutoplaySlider(3000)]
  )

  return (
    <div
      ref={sliderRef}
      className="keen-slider h-[200px] sm:h-[280px] md:h-[400px] lg:h-[550px]"
    >
      {slides.map((slide) => (
        <div key={slide.id} className="keen-slider__slide relative  flex items-center justify-center">
          <Link to={slide.link} className="block w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
      ))}
    </div>
  )
}
