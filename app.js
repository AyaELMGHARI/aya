let courses = [//declacation d'un tableau objet//
    {
        tag:'html',
        image:"images/html.png",
        title:"Learn HTML",
        price:99.99
    },
    {
        tag:'css',
        image:"images/css.png",
        title:"Learn CSS",
        price:80.66
    },
    {
        tag:'js',
        image:"images/js.png",
        title:"Learn Javascript",
        price:60
    },
    {
        tag:'php',
        image:"images/php.png",
        title:"Learn PHP",
        price:89.50
    },
    {
        tag:'html',
        image:"images/html2.png",
        title:"Learn HTML S2",
        price:89.50
    },
    {
        tag:'css',
        image:"images/css2.png",
        title:"Learn CSS S2",
        price:89.50
    },
    {
        tag:'js',
        image:"images/js2.png",
        title:"Learn Javascript S2",
        price:89.50
    },
    {
        tag:'php',
        image:"images/php1.png",
        title:"Learn PHP S2",
        price:89.50
    },
    {
        tag:'html',
        image:"images/html3.png",
        title:"Learn HTML S3",
        price:89.50
    },
]
start()

function inject(array){
    let html=`` 
    array.forEach((el,i)=>{//boucler par element et par index
        html+=`
            <div class="col">
                <div class="card">
                    <img src="${el.image}" class="card-img-top" alt="cours">
                    <div class="card-body text-center">
                        <span class="text-center">${el.title}</span>
                        <h6 class="mt-2">${el.price}$</h6>
                    </div>
                </div>
            </div>
        `
    })

    document.querySelector("#cards").innerHTML=html
}
function start(){
    
    inject(courses)

    document.querySelectorAll(".list-group-item").forEach((item,index)=>{//boucler par element et par index
        item.addEventListener('click',(e)=>{//ajouter un evenement selon le text 
          
           if(e.target.innerText.toLowerCase()==="all"){//faire le target du text pour injecter le cours voulu
            console.log("this is all")
            inject(courses)
           }
           else{
                let selectedCourses = courses.filter(course=>{
                    return (e.target.innerText.toLowerCase()===course.tag)
                })

                inject(selectedCourses)
           }
           
        })
    })

    document.querySelector("#search").addEventListener("keyup",(e)=>{//apres un evenement  KeyUp se produit après tout événement de contrôle déclenché par la frappe ou l'envoi de la clé.
        let selectedCourses = courses.filter(course=>{
            return (course.title.toLowerCase().includes(e.target.value.toLowerCase()))//filtrer par titre en ecrivant le premier lettre majuscule du cours
        })

        inject(selectedCourses)
    })


    document.querySelector("#range").addEventListener("input",(e)=>{ //ajouter un evenement par inputs sur les courses
        let selectedCourses = courses.filter(course=>{//filtrer par prix en retournant un cours de prix qui soit inferieur
            return (course.price <= e.target.value)
        })

        inject(selectedCourses)
    })



}