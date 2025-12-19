import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

let api = import.meta.env.VITE_API_TODOS
let apiCompleted = import.meta.env.VITE_API_TODOS_COMPLETED

export const GetData = createAsyncThunk("Todos/GetData", async () => {
    try {
        let { data } = await axios.get(api)
        return data
    } catch (error: any) {
        console.error(error)
    }
})

export const DeleteTodo = createAsyncThunk("Todos/DeleteTodo", async (id: number, { dispatch, rejectWithValue }) => {
    try {
        await axios.delete(`${api}?id=${id}`)
        dispatch(GetData())
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const Checked = createAsyncThunk("Todos/Check", async (id, { dispatch, rejectWithValue }) => {
    try {
        await axios.put(`${apiCompleted}?id=${id}`)
        dispatch(GetData())
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const AddNewTodo = createAsyncThunk("Todos/AddNewTodo", async (newTodo: FormData, { dispatch, rejectWithValue }) =>{
    try {
        await axios.post(api, newTodo)
        dispatch(GetData())
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const EditTodo = createAsyncThunk("Todos/EditTodo", async (todo: {name: string, description: string, id: number}, { dispatch, rejectWithValue }) => {
    try {
        await axios.put(api, todo)
        dispatch(GetData())
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const GetTodoById = createAsyncThunk("Todos/GetTodoById", async (id: number, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${api}/${id}`)
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const DeleteImage = createAsyncThunk("Todos/DeleteImage", async (ids: {imgId: number, todoId: number}, { dispatch, rejectWithValue }) =>{
    try {
        await axios.delete(`${api}/images/${ids.imgId}`)
        dispatch(GetTodoById(ids.todoId))
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const AddNewImage = createAsyncThunk("Todos/AddNewImage", async (obj: {id: number, images: FormData}, { dispatch, rejectWithValue }) => {
    try {
        await axios.post(`${api}/${obj.id}/images`, obj.images)
        dispatch(GetTodoById(obj.id))
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const SearchTodo = createAsyncThunk("Todos/SearchTodo", async (name: string, { rejectWithValue }) => {
    try {
        let { data } = await axios.get(`${api}?query=${name}`)
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})