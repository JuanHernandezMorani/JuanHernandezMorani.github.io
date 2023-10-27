import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import Chip from '@mui/material/Chip';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './cards.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, updateTodo, markTodo } from '../../actions';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

export default function CardUI({name, category, description, state, id, showImg = true, showDl = true}){
  const [showEdit, setShowEdit] = useState(false);
  const [showEditState, setShowEditState] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedState, setEditedState] = useState(state);
  const history = useHistory();
  const categories = useSelector(state => state.Categories);

  const dispatch = useDispatch();

  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTodo(id));
        history.push("/")
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'TODO deleted successfully',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Delete proccess canceled successfully',
          'error'
        )
      }
    })
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 240,
    minWidth: 240,
    height: 600,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 80,
    width: 80,
    objectFit: 'contain'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}));
const cardClass = useStyles();
const categoriesData = [
  { id: 1, name: "Entertainment" },
  { id: 2, name: "Finance" },
  { id: 3, name: "Food" },
  { id: 4, name: "Health" },
  { id: 5, name: "Home" },
  { id: 6, name: "Important Reminders" },
  { id: 7, name: "Personal" },
  { id: 8, name: "Personal Development" },
  { id: 9, name: "Personal Projects" },
  { id: 10, name: "Shopping" },
  { id: 11, name: "Social" },
  { id: 12, name: "Studies" },
  { id: 13, name: "Travel" },
  { id: 14, name: "Vehicle Maintenance" },
  { id: 15, name: "Wishlist" },
  { id: 16, name: "Work" },
];

function strToId(selectedCategoryNames) {
  const selectedCategoryIds = selectedCategoryNames.map((selectedName) => {
    const catego = categoriesData.find((cat) => cat.name === selectedName);
    return catego ? catego.id : null;
  });
  
  return selectedCategoryIds.filter((categoryId) => categoryId !== null);
}

  const handleStateChange = () => {
    let st = {state: JSON.parse(editedState)}
    dispatch(markTodo(id, st));
    setShowEditState(false);
  }

  const handleSave = () => {
    if(editedCategory.length < 5){
      var toUpdate = {
        Title: editedName,
        description: editedDescription,
        Categories: strToId(editedCategory)
      };
      dispatch(updateTodo(id, toUpdate));
      setShowEdit(false);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error 412',
        text: 'TODOs cant have more than four categories',
        footer: 'Please select 1 to 4 categories.',
      });
    }
  };
  return (
    <Card className={cardClass.root}>
      <CardActionArea>
      {showEditState ? (
        <select onChange={(e) => setEditedState(e.target.value)}>
          <option value={editedState} hidden>{editedState ? "Complete" : "Incomplete"}</option>
        <option key={0} value="false">Incomplete</option>
        <option key={1} value="true">Complete</option>
        </select>
      ) : (showImg ? (<CardMedia
        className={cardClass.media}
        component="img"
        image={state ? "https://cdn-icons-png.flaticon.com/512/11569/11569153.png" : "https://cdn-icons-png.flaticon.com/512/3033/3033010.png"}
        alt={name}
      />):(<></>))}
        <CardContent className={cardClass.cardContent}>
          <Typography gutterBottom variant="h5" component="div">
            {showEdit ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              editedName
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {showEdit ? (
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              editedDescription
            )}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Category: 
            {showEdit ? (
              <Select
              multiple
              value={editedCategory}
              onChange={(e) => {if(editedCategory.length < 4){setEditedCategory(e.target.value)} else {Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: 'TODOs cant have more than four categories',
                footer: 'Please select 1 to 4 categories.',
              });}}}
              input={<Input />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
              ))}
            </Select>
            
            ) : (
              editedCategory.map((cat) => (
                <Chip key={cat} label={cat} />
              ))
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {showEdit ? (
          <Button size="small" color="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (showEditState ? 
          <></>
          :
          <Button size="small" color="primary" onClick={() => setShowEdit(true)}>
            Edit TODO information
          </Button>
        )}
        {showEditState ? (
          <Button size="small" color="primary" onClick={handleStateChange}>
            Save
          </Button>
        ) : (showEdit ? 
        <></> 
        :
          <Button size="small" color="primary" onClick={() => setShowEditState(true)}>
            Edit TODO state
          </Button>
        )}
        {
          showDl ? (<Button size="small" color="primary" onClick={handleDelete}>
          Remove TODO
        </Button>) : (<></>)
        }
      </CardActions>
    </Card>
  );
}