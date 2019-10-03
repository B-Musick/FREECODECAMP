// action = query & list=list1 | list2

getPages = async (e)=>{
    let url = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&list=allpages&apfrom=';
    let searchString = e;
    let response = await fetch(url + searchString +'&format=json');
    let data = await response.json();
    await console.log(data.query.allpages);
    printPages(data.query.allpages);
}

let inputBar = document.getElementById('page-input');
let inputButton = document.getElementById('page-input-submit');

// inputBar.addEventListener('submit',(e)=>{
//     console.log('hi')
//     getPages(e.target.value);
// });

inputButton.addEventListener('click', (e) => {
    console.log(inputBar.value);
    getPages(inputBar.value);
})

let responseContainer = document.getElementById('api-response-container');

printPages =(e)=>{
    for(let i = 0;i<e.length;i++){
        console.log(e[i])
        let pageContainer = document.createElement('div');
        let textNode = document.createTextNode(e[i].title);
        pageContainer.appendChild(textNode);
        responseContainer.appendChild(pageContainer);
        
    }
    
}