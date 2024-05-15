import { useEffect, useState } from "react"
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api"


function Todo() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(null);


  useEffect(() => {
    getTodo();
  }, []);


  const getTodo = async () => {
    await axios
      .get("http://localhost:3000/api/todos")
      .then((res) => setTodos(res.data),
        console.log(setTodo)
      )
      .catch((Error) => console.error(Error));
  }


  const handleAddTodo = () => {
    axios
      .post(`${BASE_URL}/todo/new`, {
        title: todo,
      }).then((res) => {
        setTodos([...todos, res.data]);
        setTodo("");
      })
      .catch((error) => {
        console.error(error)
      })
  }


  // const handleDeleteTodo = (id) => {
  //   axios
  //     .delete(`${BASE_URL}/todo/delete/${id}`)
  //     .then(
  //       (res) => setTodos(todos.filter(todo._id !== res.data._id))
  //     )
  //     .catch((error) => {
  //       console.error(error);
  //     })
  // }
  const handleDeleteTodo = (id) => {
    axios
      .delete(`${BASE_URL}/todo/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const handleTodoClick = (id) => {
    axios
      .get(`${BASE_URL}/todo/toggleStatus/${id}`)
      .then(() => getTodo())
      .catch((error) => console.error(error));
  }


  return (
    <>
      <form className="w-full max-w-sm ml-96 py-5">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="ADD a New Todo"
            aria-label=""
            value={todo}
            onChange={function (e) {
              setTodo(e.target.value)
              console.log(e.target.value)
            }}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"

            onClick={handleAddTodo}
          >
            Add TODO
          </button>
        </div>

        {/* TODO List */}
        <div className="">
          {!todos || !todos.length ? (
            <h3 className="text-lg py-2">No Todo Data now</h3>
          ) : (
            todos.map((todo) => (
              <div className="flex items-center py-2" key={todo._id}>
                <div
                  onClick={() => handleTodoClick(todo._id)}
                  className={todo.complete ? "complete" : ""}
                  id="todo-title"
                >
                  {todo.title}
                </div>
                <div
                  className="delete"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  <button className="ml-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </form>

    </>
  )
}

export default Todo