import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { AddNewImage, AddNewTodo, Checked, DeleteImage, DeleteTodo, EditTodo, GetData, GetTodoById, SearchTodo } from './reducers/api';
import { Trash, Pen, Info } from 'lucide-react'
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import type { IImage } from './reducers/todosSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const App = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string()
    .matches(/^[A-Z]/, "First letter must be Upper Case")
    .min(3, "Too Short")
    .max(30, "Too Long")
    .required("Fill Input"),
    description: Yup.string()
    .matches(/^[A-Z]/, "First letter must be Upper Case")
    .min(3, "Too Short")
    .max(300, "Too Long")
    .required("Fill Input"),
  })

  const [Search, setSearch] = useState("")
  const [idx, setIdx] = useState(0)
  const [idxImg, setIdxImg] = useState(0)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm()
  };

  const [openInfo, setOpenInfo] = useState(false);

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setIdx(0)
    resetForm()
  };

  const [openNewImg, setOpenNewImg] = useState(false);

  const handleClickOpenNewImg = () => {
    setOpenNewImg(true);
  };

  const handleCloseNewImg = () => {
    setOpenNewImg(false);
    setIdxImg(0)
    resetForm()
  };

  

  const { resetForm, setFieldValue, handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      if (idx != 0) {
        dispatch(EditTodo({...values, id: idx}))
        handleCloseEdit()
        setIdx(0)
        resetForm()
      }
      else if (idxImg != 0) {
        const form = new FormData
        const images = values.images
        for (let i = 0;i<images.length;i++) {
          form.append("Images", images[i])
        }

        dispatch(AddNewImage({id: idxImg, images: form}))
        handleCloseNewImg()
        setIdxImg(0)
        resetForm()
      }
      else {
        let form = new FormData
        form.append("Name", values.name)
        form.append("Description", values.description)
        const images = values.images
        for (let i = 0;i<images.length;i++) {
          form.append("Images", images[i])
        }

        dispatch(AddNewTodo(form))
        handleClose()
        resetForm()
      }
    }
  })

  function handleImage (e) {
    let images = e.target.files

    setFieldValue("images", images)
  }

  

  const colums = [
    {
      field: 'name',
      headerName: 'Todo Name',
      width: 200 
    },
    {
      field: 'description',
      headerName: 'Todo Description',
      width: 400 
    },
    {
      headerName: 'Todo status',
      width: 300,
      renderCell: (params) => {
        return <p className={params.row.isCompleted ? "bg-[#00ff002e] text-[lime] p-[1px_25px] w-fit rounded-xl font-semibold m-[0.5vh_0] h-[6vh] items-center" : "bg-[#ff000026] text-[red] p-[1px_25px] w-fit rounded-xl font-semibold m-[0.5vh_0] h-[6vh] items-center"}>{params.row.isCompleted ? "Active" : "Inactive"}</p>
      } 
    }, {
      field: 'actions',
      headerName: 'Actions',
      width: 200 ,
      renderCell:(params)=>{
        return <div className='flex items-center m-[2vh_0] gap-[30px]'>
          <Trash onClick={() => dispatch(DeleteTodo(params.row.id))} />
          <Pen onClick={() => {
            handleClickOpenEdit()
            setIdx(params.row.id)
            setFieldValue("name", params.row.name)
            setFieldValue("description", params.row.description)
          }} />
          <Info onClick={() => {
            dispatch(GetTodoById(params.row.id))
            handleClickOpenInfo()
          }} />
          <input onChange={() => dispatch(Checked(params.row.id))} checked={params.row.isCompleted} type='checkbox' />
        </div>
      }
    },
  ]
  const { todos, isLoading, todoById } = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()

  function searchTod (e) {
    const value = e.target.value

    setSearch(value)
    dispatch(SearchTodo(value))
  }

  const [status, setStatus] = useState("all")

  function selectStatus (e) {
    const stat = e.target.value
    setStatus(stat)
    console.log(status)
  }

  useEffect(() => {
    dispatch(GetData())
  }, [])
  return (
    <div className='flex flex-col gap-[5vh] items-start w-[90%] m-[5vh_auto]'>
      <ToastContainer
        autoClose={3000}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adding New Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <input className='border-b-1 border-b-[#949494] pt-[2vh] w-full pb-[1vh]' onChange={handleImage} type='file' multiple />
            <TextField
              name='name'
              value={values.name}
              onChange={handleChange}
              autoFocus
              margin="dense"
              label="Todo Name"
              type="text"
              fullWidth
              variant="standard"
            />
            {errors.name && touched.name ? (<p className='text-[red] text-[15px] font-semibold'>{errors.name}</p>) : null}
            <TextField
              name='description'
              value={values.description}
              onChange={handleChange}
              autoFocus
              margin="dense"
              label="Todo Description"
              type="text"
              fullWidth
              variant="standard"
            />
            {errors.description && touched.description ? (<p className='text-[red] text-[15px] font-semibold'>{errors.description}</p>) : null}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openNewImg} onClose={handleCloseNewImg}>
        <DialogTitle>Adding New Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <input className='border-b-1 border-b-[#949494] pt-[2vh] w-full pb-[1vh]' onChange={handleImage} type='file' multiple />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewImg}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Editing Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              name='name'
              value={values.name}
              onChange={handleChange}
              autoFocus
              margin="dense"
              label="Todo Name"
              type="text"
              fullWidth
              variant="standard"
            />
            {errors.name && touched.name ? (<p className='text-[red] text-[15px] font-semibold'>{errors.name}</p>) : null}
            <TextField
              name='description'
              value={values.description}
              onChange={handleChange}
              autoFocus
              margin="dense"
              label="Todo Description"
              type="text"
              fullWidth
              variant="standard"
            />
            {errors.description && touched.description ? (<p className='text-[red] text-[15px] font-semibold'>{errors.description}</p>) : null}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openInfo} onClose={handleCloseInfo}>
        <DialogTitle>Todo Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <div className='flex mt-[2vh] gap-[2vh_2%] w-full flex-wrap'>
            {
              todoById?.images?.map((img:IImage) => {
              return <div key={img.id} className='flex w-[49%] flex-col gap-[1vh]'>
                <img className='h-[30vh]' src={import.meta.env.VITE_API_TODOS_IMG + "/" + img.imageName} />
                <Button onClick={() => dispatch(DeleteImage({imgId: img.id, todoId: todoById?.id}))}>Del img</Button>
              </div>
              })
            }
            <Button className='w-[49%] h-[30vh]' onClick={() => {
              handleClickOpenNewImg()
              setIdxImg(todoById?.id)
              setFieldValue("name", "Adddd")
              setFieldValue("description", "Adddd")
            }}>Add New Img</Button>
          </div>
          <h1 className='text-2xl mt-[2vh] font-bold'>Name: {todoById?.name}</h1>
          <h1 className='text-2xl mt-[2vh] font-bold flex gap-[20px] items-center'>Status: <span className={todoById?.isCompleted ? "bg-[#00ff002e] text-[lime] p-[5px_35px] w-fit rounded-xl font-semibold items-center" : "bg-[#ff000026] text-[red] p-[5px_35px] w-fit rounded-xl font-semibold items-center"}>{todoById?.isCompleted ? "Active" : "Inactive"}</span></h1>
          <p className='mt-[2vh] font-semibold text-2xl'>Description:</p>
          <p className='w-[90%]'>{todoById?.description}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInfo}>Close</Button>
        </DialogActions>
      </Dialog>

      <div className='flex gap-[20px] items-center'>
        <Button onClick={handleClickOpen}>+ Add</Button>
        <TextField value={Search} onChange={searchTod} placeholder='Search Todo By Name' type='search' />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="status"
          onChange={selectStatus}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </div>
      <div style={{width: '100%' }}>
        <DataGrid rows={todos.filter((todo) => status == "active" && todo.isCompleted || status == "inactive" && !todo.isCompleted || status=="all")} columns={colums} />
      </div>
      {isLoading ? (<CircularProgress size={200} className='m-[2vh_auto]' />) : null}
    </div>
  )
}

export default App