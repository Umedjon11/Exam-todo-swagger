import { createSlice } from '@reduxjs/toolkit'
import { AddNewImage, AddNewTodo, Checked, DeleteImage, DeleteTodo, EditTodo, GetData, GetTodoById, SearchTodo } from './api'
import { Bounce, toast } from 'react-toastify'

export interface todosState {
  isLoading: boolean,
  error: null | string,
  todos: ITodo[],
  todoById: any
}

export interface ITodo {
    id: number,
    isCompleted: boolean,
    images: IImage[],
    name: string,
    description: string
}

export interface IImage {
    id: number,
    imageName: string
}

const initialState: todosState = {
    isLoading: true,
    error: null,
    todos: [],
    todoById: {}
}

export const todosSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetData.pending, (state) => {
      state.isLoading = true
      state.todos = []
      state.error = null
    })
    builder.addCase(GetData.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.todos = payload.data
    }),
    builder.addCase(DeleteTodo.fulfilled, (state) => {
      state.error = null
      toast.success('Successfuly deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    })
    builder.addCase(DeleteTodo.rejected, (state, { payload }) => {
      state.error = null
      toast.error(payload+"", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }),
    builder.addCase(Checked.fulfilled, (state) => {
      state.error = null
      toast.success("Succesfuly changed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }),
    builder.addCase(Checked.rejected, (state, { payload }) => {
      state.error = null
      toast.error(payload+"", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }),
    builder.addCase(AddNewTodo.fulfilled, (state) => {
      state.error = null
      toast.success("Succesfuly Added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }),
    builder.addCase(AddNewTodo.rejected, (state, { payload }) => {
      state.error = null
      toast.error(payload+"", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    })
    builder.addCase(EditTodo.fulfilled, (state) => {
      state.error = null
      toast.success("Succesfuly Edited!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }),
    builder.addCase(EditTodo.rejected, (state, { payload }) => {
      state.error = null
      toast.error(payload+"", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    })
    builder.addCase(GetTodoById.fulfilled, (state, { payload }) => {
      state.todoById = payload
    })
    builder.addCase(GetTodoById.rejected, (state, { payload }) => {
      state.error = null
      toast.error(payload+"", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }),
      builder.addCase(DeleteImage.fulfilled, () => {
        toast.success("Successfuly Deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      })
      builder.addCase(DeleteImage.rejected, (state, { payload }) => {
        state.error = null
        toast.error(payload + "", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      }),
      builder.addCase(AddNewImage.fulfilled, () => {
        toast.success("Successfuly Added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      })
      builder.addCase(AddNewImage.rejected, (state, { payload }) => {
        state.error = null
        toast.error(payload + "", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      }),
      builder.addCase(SearchTodo.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.todos = payload
        toast.success("Finded " + payload.length + " Todos!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      }),
      builder.addCase(SearchTodo.pending, (state) => {
        state.isLoading = true
        state.todos = []
        state.error = null
      })
      builder.addCase(SearchTodo.rejected, (state, { payload }) => {
        state.isLoading = false
        state.todos = []
        toast.error(payload + "", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      })
  }
})

// Action creators are generated for each case reducer function
export const {} = todosSlice.actions

export default todosSlice.reducer