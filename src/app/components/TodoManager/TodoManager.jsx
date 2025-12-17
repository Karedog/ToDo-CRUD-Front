'use client'
import style from "./TodoManager.module.css"
import { getAllTodos, deleteTodo, postTodo, patchTodo } from "@/app/services/todoServices";
import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function TodoManager(){
    const [todos, setTodos] = useState([])
    const [inputText, setInputText] = useState()
    const [quantidadeCompletos, setQuantidadeCompletos] = useState(0)
    
    async function getTasks(){
        try{
            const dados = await getAllTodos()
            setQuantidadeCompletos(dados.filter(dado => dado.completed).length)
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
    async function handlerCheckBox(id,completed){
        await patchTodo(id, completed)
        getTasks()
    }

    useEffect(()=>{
        getTasks()
    },[])

    return (
        <main className={style.mainContainer}>
            <h1 className={style.titulo}>Gerenciador de Tarefas</h1>
            <div className={`${style.middleContainer} ${style.inputTodo}`}>
                <input type="text" className={style.inputArea} onChange={(e)=>handlerInput(e.target.value)}
                    placeholder="Adicionar nova tarefa..." />
                <button className={style.bInput}onClick={async () => handlerPostButton()}>+</button>
            </div>
            <div className={style.todosContainer}>
                <ul>
                    {todos.filter(todo => !todo.completed).map(todo => {
                            return <li key={todo.id} className={`${style.middleContainer} ${style.todoCaixa}`}>
                                <div className={style.todoText}>
                                    <input type="checkbox" className={style.todoCheck} onChange={(e)=> handlerCheckBox(todo.id,e.target.checked)}  checked={todo.completed}/>
                                    <p>{todo.task}</p>
                                </div>
                                <div className={style.buttonTodoCaixa}>
                                    <button className={style.todobutton} onClick={
                                        async ()=>{
                                        await deleteTodo(todo.id)
                                        handlerDelete(todo.id)
                                        }
                                    }
                                    ><FaRegTrashAlt className={style.todoButtonIcon}/></button>
                                </div>
                            </li>
                    })}
                </ul>
            </div>
            <div className={style.todoCompletedContainer}>
                <h3 className={style.CompletedTitle}>{`Completos (${quantidadeCompletos})`}</h3>
                <ul>
                    {todos.filter(todo => todo.completed).map(todo => {
                            return <li key={todo.id} className={style.middleContainer}>
                                <div className={style.todoText}>

                                    <input type="checkbox" className={style.todoCheck} onChange={(e)=> handlerCheckBox(todo.id,e.target.checked)} checked={todo.completed}/>
                                    <p className={style.todoCompleted}>{todo.task}</p>
                                </div>
                                <div className={style.buttonTodoCaixa}>
                                    <button  className={style.todobutton} onClick={
                                        async ()=>{
                                        await deleteTodo(todo.id)
                                        handlerDelete(todo.id)
                                        }
                                    }
                                    ><FaRegTrashAlt className={style.todoButtonIcon}/></button>
                                </div>
                            </li>                      
                    })}
                </ul>
            </div>
        </main>            
    );
}