import 'dotenv/config';

async function getAllTodos() {

    try{
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL,
            {method: "GET"})
            
        const dados = await response.json()   
        if(!response.ok){
            throw new Error(dados.mensagem)
        }
        return dados
    }catch(erro){
        console.log(erro)
    }
}
async function deleteTodo(id){
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + id,
            {method: "DELETE"})
            
        const dados = await response.json()   
        console.log(dados)
        if(!response.ok){
            throw new Error(dados.mensagem)
        }
        return dados
    }catch(erro){
        console.log(erro)
    }
    
}
async function postTodo(task){

    console.log(task)
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL,
            {    
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"task": task})
            })
            
        const dados = await response.json()   
        console.log(dados)
        if(!response.ok){
            throw new Error(dados.mensagem)
        }
        return dados
    }catch(erro){
        console.log(erro)
    }

}
async function patchTodo(id, completed){

    try{
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+id,
            {    
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"completed": completed})
            })
            
        const dados = await response.json()   
        console.log(dados)
        if(!response.ok){
            throw new Error(dados.mensagem)
        }
        return dados
    }catch(erro){
        console.log(erro)
    }

}

export{getAllTodos, deleteTodo, postTodo, patchTodo}