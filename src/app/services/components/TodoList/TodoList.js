import { getTodosAll } from "../../todoServices"
export default async function TodoList(){
    const dados = await getTodosAll()
    return (<ul>
        {dados.map(dado =>{
            return <li key={dado.id}>{dado.task}</li>
        })}
    </ul>)
}