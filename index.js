const ApiUrl = 'https://api.spacexdata.com/v3/launches?limit=100'
const results = document.querySelector('.results')

const btns = document.querySelectorAll('[id=btn]')
const launchBtn = document.querySelectorAll('[id=btn1]')
const landBtn = document.querySelectorAll('[id=btn2]')

getData(ApiUrl)
async function getData(url){
    const res = await fetch(url);
    const data = await res.json();
    showLaunches(data);
}

function showLaunches(data){
    results.innerHTML=''
    data.forEach(res=>{
        const {
            flight_number,
            mission_name,
            mission_id,
            launch_year,
            launch_success,
            links,
            rocket,
          } = res;
        const imgUrl = links.mission_patch;
        const land_success = rocket.first_stage.cores[0].land_success;  
        const result = document.createElement('div')
        result.classList.add('result')

        result.innerHTML=`
        <div class="result">
                <img src=${imgUrl}>
                <h3>${mission_name.slice(0,10)} #${flight_number}</h3>
                <div class="info">
                    <div><strong>Mission Ids: </strong>${mission_id[0]? mission_id[0]:"Not Available"}</div>
                    <div><strong>Launch Year: </strong>${launch_year}</div>
                    <div><strong>Successful Lauch: </strong>${launch_success? "ture":"false"}</div>
                    <div><strong>Successful Landing: </strong>${land_success? "true":"false"}</div>        
                </div>                
        </div>
        `    

        results.appendChild(result)
    })
}

// Year-Button Sections
btns.forEach(x=>{
    x.addEventListener('click',()=>btnFunc(x))
})

// Launch Button
launchBtn.forEach(x=>{
    x.addEventListener('click',()=>btnLaunch(x))
})

// Land Button
landBtn.forEach(x=>{ 
    x.addEventListener('click',()=>btnLand(x))   
})

function btnFunc(btn){
    if(btn.classList.contains('clicked')){
        btns.forEach(x=>{
            x.classList.remove('clicked')
        })
        getData(ApiUrl)
    }else{
        btns.forEach(x=>{
            x.classList.remove('clicked')
        })
        getData(ApiUrl+'&launch_year='+btn.innerText)
    }    
    btn.classList.toggle('clicked')
}

function btnLaunch(btn){
    if(btn.classList.contains('clicked')){
        btns.forEach(x=>{
            x.classList.remove('clicked')
        })
        getData(ApiUrl)
    }else{
        btns.forEach(x=>{
            x.classList.remove('clicked')
        })
        getData(ApiUrl+'&launch_success='+btn.innerText.toLowerCase())
    }    
    btn.classList.toggle('clicked')
}

function btnLand(btn){
    if(btn.classList.contains('clicked')){
        btns.forEach(x=>{
            x.classList.remove('clicked')
        })
        getData(ApiUrl)
    }else{
        btns.forEach(x=>{
            x.classList.remove('clicked')
        })
        getData(ApiUrl+'&land_success='+btn.innerText.toLowerCase())
    }    
    btn.classList.toggle('clicked')
}