import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, getCategories } from '../../actions';
import ReactDOM from "react-dom";

export function ModalUI({ name, category, description, state, id, editMode, setEditMode }) {
  const [editedName, setEditedName] = useState(name);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedState, setEditedState] = useState(state);

  const categories = useSelector((state) => state.Categories);
  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedTodo = {
      title: editedName,
      Categories: [editedCategory],
      description: editedDescription,
      status: editedState,
    };
    dispatch(updateTodo(id, updatedTodo));
    setEditMode(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Card sx={{ width: 340, maxWidth: 340 }}>
      <CardActionArea>
        <CardContent>
          {editMode ? (
            <div>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <FormControl>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <FormControl>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={editedState}
                  onChange={(e) => setEditedState(e.target.value)}
                >
                  <MenuItem value={true}>Completo</MenuItem>
                  <MenuItem value={false}>Incompleto</MenuItem>
                </Select>
              </FormControl>
              <button onClick={handleSave}>Guardar</button>
            </div>
          ) : (
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {editedName}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {editedState ? 'Complete' : 'Incomplete'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción: {editedDescription}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                Categoría: {editedCategory}
              </Typography>
              <button onClick={() => setEditMode(true)}>Editar</button>
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function ModalCard({ name, category, description, state, id, editMode, setEditMode }) {
  return ReactDOM.createPortal(
    <ModalUI
      name={name}
      category={category}
      description={description}
      state={state}
      id={id}
      editMode={editMode}
      setEditMode={setEditMode}
    />,
    document.getElementById('modal-root')
  );
}
