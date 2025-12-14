async function getTodosAll() {

    try{
        const response = await fetch("https://todo-crud-tmwj.onrender.com/todos",
            {method: "GET"})
            
        const dados = await response.json() 
            return dados
    }catch(erro){
        return new Error("falha ao conectar com a API")
    }
}

export{getTodosAll}