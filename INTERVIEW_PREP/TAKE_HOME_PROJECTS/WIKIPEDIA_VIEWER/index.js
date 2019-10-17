// action = query & list=list1 | list2

getPages = async (e)=>{
    let url = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=';
    let searchString = e;
    let response = await fetch(url + searchString +'&format=json');
    let data = await response.json();
    await console.log(data.query);
    printPages(data.query.search);
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
    let responseHref = 'https://en.wikipedia.org/?curid='; // Add pageid to get the page

    responseContainer.innerHTML=""; // Clear all the data from previous search

    for(let i = 0;i<e.length;i++){
        console.log(e[i])

        
        // ADD TITLE
        let anchor = document.createElement('a');
        anchor.className = 'wiki-page-anchor';
        let pageContainer = document.createElement('div');
        pageContainer.className = 'wiki-page';
        let titleNode = document.createTextNode(e[i].title);
        pageContainer.appendChild(titleNode);


        

        // ADD DESCRIPTION
        let descriptionContainer = document.createElement('p');
        descriptionContainer.innerHTML = e[i].snippet;
        pageContainer.appendChild(descriptionContainer);
        
        // SET LINK
        anchor.href = responseHref + e[i].pageid;
        anchor.appendChild(pageContainer);

        // ADD PAGE TO SCREEN
        responseContainer.appendChild(anchor);
        
    }
    
}