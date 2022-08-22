const $$ = document.querySelectorAll.bind(document)
const $ = document.querySelector.bind(document)

console.log([$('.cd-thumb').offsetHeight]);
const x = $('.cd-thumb').offsetHeight
let z = $('.cd-thumb').offsetWidth

const app= {
    currentIndex : 1,
    song: [
        {
            title: 'Nevada',
            singer: 'Vicetone',
            path: '/assets/musics/Nevada Lyrics  Vicetone feat Cozi Zuehlsdorff.mp3',
            image:'/assets/nevada.JPG'
        },
        {
            title: 'Sweet but Psycho',
            singer: 'Ava Max',
            path: '/assets/musics/Ava-Max-Sweet-but-Psycho-Official-Music-Video.mp3',
            image:'/assets/sweet-but-psycho.JPG'
            
        },
        {
            title: 'Đế Vương Remix',
            singer: 'Dunghoangpham x Đình Dũng x Ciray',
            path: '/assets/musics/de-vuong.mp3',
            image:'/assets/de-vuong.JPG'
        },
        {
            title: 'Xem Như Em Chẳng May Remix',
            singer: 'Chu Thuý Quỳnh Đại Mèo Remix',
            path: '/assets/musics/ngot-ngao-den-may-cung-tan-thanh-may.mp3',
            image:'/assets/xemnhuemchangmay.JPG'
            
        },
        {
            title: 'Thế Thái',
            singer: 'Hương Ly',
            path: '/assets/musics/the-thai.mp3',
            image:'/assets/the-thai.JPG'
            
        },
        {
            title: 'Tự Em Đa Tình',
            singer: 'Quinn',
            path: '/assets/musics/tu-em-da-tinh.mp3',
            image:'/assets/tuemdatinh.JPG'
        },
        {
            title: 'Vui Lắm Nha Remix',
            singer: 'Hương Ly',
            path: '/assets/musics/vui-lam-nha.mp3',
            image:'/assets/vui-lam-nha.JPG'
            
        }
    
    
    ],
    defineProperties :function(){
        Object.defineProperty(this,'currentSong',{ 
             get :function(){
                return this.song[this.currentIndex]
            } 
             
        })
        // console.log(this)
    },
    render: function(){
        // console.log(this.song)
        const htmls = app.song
        let html = htmls.map((value,index,array)=>{
            let name = value.title
            let singer = value.singer
            let path = value.path
            let image = value.image
            // console.log(name,singer,path,image)
            return `
            <div class="musicItem ">
            <div class="cd-thumb" style="background-image: url('${image}')" ></div>
            <div class="body">
                <h2 class="title">${name}</h2>
                <p class="author">${singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`
        })
        // console.log(html.join(""))
        $('.Musiclist').innerHTML = html.join("")
        // render


    },
    handleEvent: function () {
        _this = this
         slide= () => {
            // console.log(window.scrollY);
            // console.log(document.documentElement.scrollTop);
            let y = scrollY
            if (y>x) {
                $('.cd-thumb').style.height= 0+'px'
                $('.cd-thumb').style.width = 0+'px'
                $('.cd-thumb').style.opacity = 0
            }else{
                $('.cd-thumb').style.height = (x-y)+'px'
                $('.cd-thumb').style.width = (z-y)+'px'
                $('.cd-thumb').style.opacity = (x-y)/x

            }

        }
        ///control Musics
        const btnPlay = $('.btn-play .play')
        const btnPause = $('.btn-play .pause')
        const btnRepeat = $('.btn-repeat')
        const timeLine = $('.timeLine')

        // console.log(btnList);
        const audio = $('#audio')
        // activetButton = ()=>{
        //     let btnActive = btnList.forEach(function (value) {
        //         if(value.classList.contains('active')){
        //             value.classList.remove('active')
        //         }
        //     }
        // )
        //     // console.log(btnActive)
        // }
        ////Xu lys cd quay , dung`
        const cd = $('.cd')
        const cdRotate= cd.animate([{
            transform : "rotate(360deg)"}
        ],{
            duration : 10000,
            iterations: Infinity
        })
        console.log(cdRotate)
        cdRotate.pause()
        
        ////
        playSong = ()=>{
            audio.play()
            btnPlay.classList.remove('active')
            btnPause.classList.add('active')
            cdRotate.play()
        }
        pauseSong = ()=>{
            audio.pause()
            btnPlay.classList.add('active')
            btnPause.classList.remove('active')
            cdRotate.pause()
        }
        audio.ontimeupdate = function (params) {
            if(audio.duration){
              const timeLinePercent = Math.floor(audio.currentTime/audio.duration*100)
                timeLine.value = timeLinePercent
            }
            
        }
        //xu ly khia tua
        timeLine.onchange = function(){
            // const timeLinePercent = Math.floor(audio.currentTime/audio.duration*100)
            audio.currentTime = (timeLine.value/100)*audio.duration
            console.log(timeLine.value)
        }

        repeatSong =() =>{
            btnRepeat.classList.toggle('active')
            if(audio.loop){
            audio.loop = false
            }else{
                audio.loop = true
            }
            console.log(audio.loop)
            // activetButton()

        }
        addEventListener("scroll",slide)//bat event lan chuot
        btnPlay.addEventListener("click",playSong)//bat event click play
        btnPause.addEventListener("click",pauseSong)//bat event click play
        btnRepeat.addEventListener("click",repeatSong)//bat event click repeat

        ////Next song
        const btbNext= $('.btn-forward')
        const btbBack= $('.btn-backward')
        btbNext.onclick = function () {
            _this.nextSong()
            pauseSong()
            setTimeout(()=>{
                playSong()
            },100)
        }
        btbBack.onclick = function () {
            _this.backSong()
            pauseSong()
            setTimeout(()=>{
                playSong()
            },100)
        }
        //select song
        
        console.log(this.song[this.currentIndex])
        const musicItems = $$('.musicItem')
        musicItems.forEach(function(value,index,array) {
            let musicItem = value
            
            selectSong =  function(){
                
                array.forEach(function(value){
                    console.log(value)
                            value.classList.remove('active');
                })
                value.classList.add('active')                            
                console.log(index);
                _this.selectItemSong(index)
                pauseSong()
                setTimeout(()=>{
                    playSong()
                },100)
            }
         musicItem.addEventListener("click",selectSong)
        });
    },
    loadCurrentSong: function() {
        const heading= $('.songName')
        const cdThumb= $('.cd-thumb')
        const audio= $('#audio')
        console.log("dsds")
        heading.textContent = this.currentSong.title
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = `${this.currentSong.path}`
        console.log(heading,cdThumb,audio)


    },
    nextSong: function () {
        this.currentIndex++
        if(this.currentIndex >= this.song.length){
            this.currentIndex = 0
        }
        console.log(this.currentIndex)
        this.loadCurrentSong()
    },
    backSong: function () {
        this.currentIndex--
        if(this.currentIndex <= 0){
            this.currentIndex =  this.song.length-1
        }
        console.log(this.currentIndex)
        this.loadCurrentSong()
    },
    selectItemSong: function name(x) {
        this.currentIndex = x
        this.loadCurrentSong()

    },
    start: function(){      
        // render
        this.render()
        //define properties to object
        this.defineProperties()
        //handle Events Dom
        this.handleEvent()
        console.log(this.currentSong)
        //loading current song
        this.loadCurrentSong()

    }

}
app.start()

