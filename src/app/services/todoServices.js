async function getAllTodos() {

    try{
        const response = await fetch("https://todo-crud-tmwj.onrender.com/todos",
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
        const response = await fetch("https://todo-crud-tmwj.onrender.com/todos/"+ id,
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
}

export{getAllTodos, deleteTodo, postTodo}