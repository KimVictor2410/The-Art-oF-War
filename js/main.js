// slider
class SLIDER{
  constructor(obj){
    this.slider = obj.slider
    this.sliderList = this.slider.querySelector('.slider-list')
    this.sliderItems = this.slider.querySelectorAll('.slider-list__item')
    this.nextBtn = this.slider.querySelector('.prev')
    this.nextBtn = this.slider.querySelector('.next')
    this.activeSlide = 0
    this.timeMove = 1000
    this.dir = obj.direction
    this.moveSlide = 100
    this.interval = obj.interval
    this.createDots = obj.dots
    this.play = obj.autoplay
    
    this.sliderItems.forEach((slide, key)=>{
      if(key != this.activeSlide){
        slide.style.transform = `translate${this.dir}(${this.moveSlide}%)`
      }
      if(key == this.sliderItems.length - 1){
        slide.style.transform = `translate${this.dir}(${-this.moveSlide}%)`
      }
    })
    // dots
    if(this.createDots == true){
      const ul = document.createElement('ul')
      ul.classList.add('slider-dots')
      this.sliderItems.forEach(()=>{
        const li = document.createElement('li')
        ul.append(li)
      })
      this.slider.append(ul);
      this.sliderDots = this.slider.querySelectorAll('.slider-dots li')
      this.sliderDots[this.activeSlide].classList.add('active')
      this.sliderDots.forEach((dot, key)=>{
        dot.addEventListener('click', ()=>{this.controllers(key)})
      })
      this.active = true
    }
    // autoplay
    if(this.play == true){
      let autoPlay = setInterval(()=>{
        this.move(this.nextBtn)
      }, this.interval);
      this.slider.addEventListener('mouseenter', ()=>{
        clearInterval(autoPlay)
      })
      this.slider.addEventListener('touchstart', ()=>{
        clearInterval(autoPlay)
      })
      this.slider.addEventListener('mouseleave', ()=>{
        autoPlay = setInterval(()=>{
          this.move(this.nextBtn)
        }, this.interval);
      })
    }
    this.nextBtn.addEventListener('click', ()=>{this.move(this.nextBtn)})
    // if(this.nextBtn != null && this.prevBtn != null){
    //   this.prevBtn.addEventListener('click', ()=>{this.move(this.prevtBtn)})
    // }
    this.touchSlide = true
    this.slider.addEventListener('touchmove', (e)=>{this.touchMove(e)})
  }
  move(btn = null){
    this.nextBtn.disabled = true
    setTimeout(() => {
      this.nextBtn.disabled = false
    }, this.timeMove + 200);
    // if(this.nextBtn != null && this.prevBtn != null){
    //   this.prevBtn.disabled = true
    //   this.nextBtn.disabled = true
    //   setTimeout(() => {
    //     this.prevBtn.disabled = false
    //     this.nextBtn.disabled = false
    //   }, this.timeMove + 200);
    // }
    let btnPrevOrNext
    if(btn == null){
      btnPrevOrNext = -this.moveSlide
    }else{
      btnPrevOrNext = btn == this.nextBtn ? -this.moveSlide : this.moveSlide;
    }
    this.sliderItems.forEach((slide, key)=>{
      if(key != this.activeSlide){
        slide.style.transform = `translate${this.dir}(${-btnPrevOrNext}%)`;
        slide.style.transition = '0ms'
      }
    })
    setTimeout(() => {
      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${btnPrevOrNext}%)`;
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
      if(this.createDots == true){this.sliderDots[this.activeSlide].classList.remove('active')}
      if(btn == this.nextBtn){
        this.activeSlide++
        if(this.activeSlide > this.sliderItems.length - 1){
          this.activeSlide = 0
        }
      }else if(btn == this.prevBtn){
        this.activeSlide--
        if(this.activeSlide < 0){
          this.activeSlide = this.sliderItems.length - 1
        }
      }
      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(0%)`;
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
      if(this.createDots == true){this.sliderDots[this.activeSlide].classList.add('active')}
    }, 100);
  }
  controllers(dotKey){
    if(this.active && dotKey != this.activeSlide){
      this.sliderItems.forEach((slide, key)=>{
        slide.style.transition = '0ms'
      })
      this.active = false
      this.nextBtn.disabled = true
      // if(this.nextBtn != null && this.prevBtn != null){
      //   this.prevBtn.disabled = true
      // }
      let dotLeftOrRight = dotKey > this.activeSlide ? -this.moveSlide : this.moveSlide;
      this.sliderDots.forEach((dot)=>{dot.classList.remove('active')})
      this.sliderItems[dotKey].style.transform = `translate${this.dir}(${-dotLeftOrRight}%)`
      
      setTimeout(() => {
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${dotLeftOrRight}%)`
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
        this.sliderDots[this.activeSlide].classList.remove('active')
        this.activeSlide = dotKey
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(0%)`
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
        this.sliderDots[this.activeSlide].classList.add('active')
      }, 100);
      setTimeout(() => {
        this.active = true
        this.nextBtn.disabled = false
        // if(this.nextBtn != null && this.prevBtn != null){
        //   this.prevBtn.disabled = false
        // }
      }, this.timeMove + 200);
    }
  }
  touchMove(e){
    if(this.touchSlide){
      this.touchSlide = false
      if(this.slider.clientWidth / 2 < e.touches[0].pageX){
        this.move(this.nextBtn)
      }else{
        this.move(this.prevBtn)
      }
      setTimeout(() => {
        this.touchSlide = true
      }, this.timeMove + 200);
    }
  }
}

const sliders = document.querySelectorAll('.slider-js')
for(const slider of sliders){
  const autoplay = slider.hasAttribute('autoplay') ? true : false;
  const createDots = slider.hasAttribute('create-dots') ? true : false;
  const direction = slider.getAttribute('direction') == 'Y' || slider.getAttribute('direction') == 'y' ? 'Y' : 'X';
  const interval = slider.getAttribute('interval') >= 2000 ? Number(slider.getAttribute('interval')) : 2000;
  new SLIDER({
    slider: slider,
    direction: direction,
    dots: createDots,
    autoplay: autoplay,
    interval: interval,
  })
}

// dots-tabs
const contentDots = document.querySelectorAll('.content-dots li')
const contentText = document.querySelectorAll('.content-dots__text')
let activeSlide1 = 0
contentDots[activeSlide1].classList.add('active')
contentDots.forEach(function(dot, key){
  dot.addEventListener('click', function(){controllersContent(key)})
})

function controllersContent(dotKey1){
  if(dotKey1 != activeSlide1){
    contentDots.forEach(function(dot){dot.classList.remove('active')})
    contentDots[activeSlide1].classList.remove('active')
    activeSlide1 = dotKey1
    contentDots[activeSlide1].classList.add('active')
  }
}

contentDots.forEach(function(link, key){
  link.addEventListener('click', function(){
    contentDots.forEach(function(link2, key2){
      contentText[key2].classList.add('active')
    })
    contentText[key].classList.remove('active')
  })
})