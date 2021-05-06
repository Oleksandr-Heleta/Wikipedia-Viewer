
const input = document.getElementById('input');
const searchBtn = document.getElementById('search');
const root = document.getElementById('root');


const goToWiki = () => {
    root.innerHTML = "";
    const inpValue = input.value.trim();
    const regex = /[ ]{2,}/gi;
    const keyword = inpValue.replaceAll(regex, " ");
    console.log(keyword);
    
    let url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${keyword}&gsrlimit=20&prop=extracts&exchars=130&exintro&explaintext&exlimit=max&format=json&origin=*`;
    
    fetch(url)
    .then(
      (res) => {
        return res.json();
      }
    ).then( 
        (res) => {
            let obj = res.query.pages;
            
            for (key in obj){
                let rendItem = new FindItems(obj[key].pageid, obj[key].title, obj[key].extract);
                console.log(rendItem);
                rendItem.render();  
            }
          
        }
    )
}

class FindItems {
    constructor(id, title, description){
        this.id = id;
        this.title = title;
        this.description = description;

    }

    render(){
        const item = document.createElement('a');
        item.setAttribute('target', '_blank');
        item.href = 'https://en.wikipedia.org/?curid='+this.id;
        item.innerHTML = `<div>${this.title}</div>${this.description}<div></div>`;

        root.appendChild(item);
    }
}




searchBtn.addEventListener('click', goToWiki);
input.addEventListener('keydown', event =>{
    if(event.code === 'Enter'){
        goToWiki();
    };
});

// ancor https://en.wikipedia.org/?curid=170459
// https://www.youtube.com/watch?v=Dk6Wopar10k