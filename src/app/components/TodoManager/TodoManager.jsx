'use client'
import style from "./TodoManager.module.css"
import { getAllTodos, deleteTodo, postTodo } from "@/app/services/todoServices";
import { useState, useEffect } from "react";

export default function TodoManager(){
    const [todos, setTodos] = useState([])
    const [inputText, setInputText] = useState()
    
    async function getTasks(){
        try{
            const dados = await getAllTodos()
            setTodos(dados)
            return
        }catch(erro){
            return 
        }
    }
    function handlerInput(text){
        setInputText(text)
    }
    function handlerDelete(id){
        const newDados = todos.filter(dado => dado.id !== id)
        setTodos(newDados)
    }
    async function handlerPostButton(){
        await postTodo(inputText)
        getTasks()
    }

    useEffect(()=>{
        getTasks()
    },[])

    return (
        <main>
            <h1>Gerenciador de Tarefas</h1>
            <div className={style.todoInputContainer}>
                <input type="text" onChange={(e)=>handlerInput(e.target.value)}
                    placeholder="Adicionar nova tarefa" />
                <button onClick={async () => handlerPostButton()}>+</button>
            </div>
            <div className={style.todoContainer}>
                <ul>
                    {todos.filter(todo => !todo.completed).map(todo => {
                            return <li key={todo.id}>
                            <input type="checkbox" onChange={()=> getTasks()}  checked={todo.completed}/>
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
                            <input type="checkbox" onChange={()=> getTasks()} checked={todo.completed}/>
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