'use client'
import style from "./TodoManager.module.css"
import { getAllTodos, deleteTodo } from "@/app/services/todoServices";
import { useState, useEffect } from "react";

export default function TodoManager(){
    const [todos, setTodos] = useState([])
    
    async function getTasks(){
        try{
            const dados = await getAllTodos()
            setTodos(dados)
            return
        }catch(erro){
            return 
        }
    }
    function handlerDelete(id){
        const newDados = todos.filter(dado => dado.id !== id)
        setTodos(newDados)
    }

    useEffect(()=>{
        getTasks()
    },[])

    return (
        <main>
            <h1>Gerenciador de Tarefas</h1>
            <div className={style.todoInputContainer}>
                <input type="text" placeholder="Adicionar nova tarefa" />
                <button>+</button>
            </div>
            <div className={style.todoContainer}>
                <ul>
                    {todos.filter(todo => !todo.completed).map(todo => {
                            return <li key={todo.id}>
                            <p>{todo.task}</p>
                            <button onClick={
                                async ()=>{
                                await deleteTodo(todo.id)
                                handlerDelete(todo.id)
                                }
                            }
                            >deletar</button>
                            </li>
                    })}
                </ul>
            </div>
            <div className={style.todoCompletedContainer}>
                <h3>Completas</h3>
                <ul>
                    {todos.filter(todo => todo.completed).map(todo => {
                            return <li key={todo.id}>
                            <p>{todo.task}</p>
                            <button onClick={
                                async ()=>{
                                await deleteTodo(todo.id)
                                handlerDelete(todo.id)
                                }
                            }
                            >deletar</button>
                            </li>                      
                    })}
                </ul>
            </div>
        </main>            
    );
}