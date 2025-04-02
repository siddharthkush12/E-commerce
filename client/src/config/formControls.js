export const loginFormControls=[
    {
        name:'email',
        label:'Email',
        placeholder:'Enter your Email',
        componentType:'input',
        type:'email',
    },
    {
        name:'password',
        label:'Password',
        placeholder:'Enter Password',
        componentType:'input',
        type:'password',
    }
]

export const registerFormControls=[
    {
        name:'username',
        label:'User Name',
        placeholder:'Enter your user name',
        componentType:'input',
        type:'text',
    },
    {
        name:'email',
        label:'Email',
        placeholder:'Enter your Email',
        componentType:'input',
        type:'email',
    },
    {
        name:'password',
        label:'Password',
        placeholder:'Enter Password',
        componentType:'input',
        type:'password',
    }

]


export const addProductFormElements=[
    {
        name:"title",
        label:"Title",
        componentType:"input",
        type:"text",
        placeholder:"Enter your Product titile"
    },
    {
        name:"description",
        label:"Description",
        componentType:"textarea",
        placeholder:"Enter your Product Description"
    },
    {
        name:"category",
        label:"Category",
        componentType:"select",
        options:[
            {id:"men",label:"Men"},
            {id:"women",label:"Women"},
            {id:"kids",label:"Kids"},
            {id:"accessories",label:"Accessories"},
            {id:"footwear",label:"Footwear"},
        ],
    },
    {
        name:"brand",
        label:"Brand",
        componentType:"select",
        options:[
            {id:"nike",label:"Nike"},
            {id:"adidas",label:"Adidas"},
            {id:"puma",label:"Puma"},
            {id:"levis",label:"Levi's"},
            {id:"zara",label:"Zara"},
            {id:"h&m",label:"H&M"},
        ],
    },
    {
        name:"price",
        label:"Price",
        componentType:"input",
        type:"number",
        placeholder:"Enter Product price"
        
    },
    {
        name:"saleprice",
        label:"Sale Price",
        componentType:"input",
        type:"number",
        placeholder:"Enter Sale price (Optional)"
        
    },
    {
        name:"stock",
        label:"Stock",
        componentType:"input",
        type:"number",
        placeholder:"Enter Total Stock"
    },
] 

