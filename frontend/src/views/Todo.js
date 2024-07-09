import {useState, useEffect} from "react"
import useAxios from "../utils/useAxios"
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
function Todo() {
    const baseURL = "http://127.0.0.1:8000/api"
    const api = useAxios()
    const [todos, setTodos] = useState([])
    const token = localStorage.getItem('authTokens')
    const decode = jwt_decode(token)
    const user_id = decode.user_id
    const username = decode.username
    console.log("Username is: ",username)

    

    useEffect(() => {
        getUserTodos()
    },[])


    const getUserTodos = async () => {
        await api.get(baseURL + '/todo/' + user_id + '/').then((response) =>{
            console.log(response.data)
            setTodos(response.data)
        })
    }
    const [createTodo, setCreateTodo] = useState({title:"", completed:""})
    const handleNewTodoTitle = (event)=> {
        setCreateTodo({
            ...createTodo, 
            [event.target.name]: event.target.value
        })
    }
    console.log(createTodo.title)

    const formSubmit = ()=>{
        const formData = new FormData()

        formData.append("user", user_id)
        formData.append('title', createTodo.title)
        formData.append('completed', false)

        try {
            api.post(baseURL + '/todo/' + user_id + '/' , formData).then((response)=>{
                console.log(response.data)
                Swal.fire({
                    title: "Todo Added",
                    icon:"success",
                    toast: true,
                    timer: 2000,
                    position: "top-right",
                    timerProgressBar: true,
                })
                getUserTodos()
                // createTodo.title = ""
                setCreateTodo({title:"", completed:""})
            })
        } catch (error) {
            
        }
    
    }
    const deleteTodo = async (todo_id) => {
        await api.delete(baseURL + '/todo-detail/' + user_id + '/' + todo_id + '/')
        Swal.fire({
            title: "Todo Deleted",
            icon: "success",
            toast: true,
            timer : 2000,
            position: "top-right",
            timerProgressBar: true,
        })
        getUserTodos()
    }

    const markTodoAsComplete = async (todo_id) => {
        await api.patch(baseURL + '/todo-mark-as-completed/' + user_id + '/' + todo_id + '/')
        Swal.fire({
            title: "Todo Completed",
            icon:"success",
            toast: true,
            timer: 2000,
            position: "top-right",
            timerProgressBar: true,
        })
        getUserTodos()
    }








  return (
    <div>
        <div>
            <div>
                <div className="container" style={{marginTop:"150px", padding:"10px"}}>
                    <div className="row justify-content-center align-items-center main-row">
                        <div className="col shadow main-col bg-white">
                            <div className="row bg-primary text-white">
                                <div className="col p-2">
                                    <h4>{username} Todo App</h4>
                                </div>
                            </div>
                            <div className="row justify-content-between text-white p-2">
                                <div className="form-group flex-fill mb-2">
                                    <input id="todo-input" name='title'
                                     onChange={handleNewTodoTitle}
                                     value={createTodo.title}  type="text" className="form-control" placeholder='write a todo...' />
                                </div>
                                <button type="button" onClick={formSubmit} className="btn btn-primary mb-2 ml-2"> Add todo </button>
                            </div>

                            <div className="row" id="todo-container">
                                {todos.map((todo)=>

                                        <div className="col col-12 p-2 todo-item">
                                        <div className="input-group">
                                             {todo.completed.toString()==="true" &&
                                                <p className="form-control"><strike>{todo.title}</strike></p>
                                             }  
                                             {todo.completed.toString()==="false" &&
                                                <p className="form-control">{todo.title}</p>
                                             }  
                                            
                                            <div className="input-group-append">
                                                <button className="btn bg-success text-white ml-2" type="button" id="button-addon2"  onClick={() => markTodoAsComplete(todo.id)}><i className='fas fa-check' ></i></button>
                                                <button className="btn bg-danger text-white me-2 ms-2 ml-2" type="button" id="button-addon2" onClick={()=>deleteTodo(todo.id)}><i className='fas fa-trash' ></i></button>
                                            </div>
                                        </div>
                                        </div>
                            
                                )}
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Todo
