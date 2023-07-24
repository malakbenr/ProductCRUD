import React, {useState} from 'react';
import { TrashIcon, PencilIcon, BellIcon, XMarkIcon, CheckCircleIcon, } from "@heroicons/react/24/solid";
import { Input, Typography, IconButton, Dialog, DialogBody, DialogFooter,DialogHeader, Button} from '@material-tailwind/react';
import Message from './Message';


const Product = ({produit, classes}) => {

  const API_URL = "http://127.0.0.1:8000/rest_api/produits/";

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [nomE, setNomE] = useState(produit.nom);
  const [prixE, setPrixE] = useState(produit.prix);
  const [qteE, setQteE] = useState(produit.qte);
 
  const handleOpen = () => setOpen(!open);
  const handleOpenEdit = () => setOpenEdit(!openEdit);

  //Supprimer produit
  const deleteProduct = () => {
   fetch(API_URL + produit.id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })  
      .then(() => {   
        setOpen(false);
        setAlertShow(true);
      })
      }
  
  //Modifier produit
  const updateProduct = () => {
    console.log(API_URL + produit.id);
      fetch(API_URL + produit.id + '/', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        nom: nomE,
        prix: prixE,
        qte: qteE,
      }),
      
    })
    .then(response => response.json())
    .then(data => {
        setOpenEdit(false);
        setAlertShow(true);
      }).catch((err)=>{
        console.log(err.message)
      })
      }   
  
    
  return (
    <>
    <tr className="p-4 border-b border-blue-gray-50">
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {produit.nom}
        </Typography>
      </td>
      <td className={classes}>    
        <Typography variant="small" color="blue-gray" className="font-normal">
          {produit.prix} €
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {produit.qte}
        </Typography>
      </td>
      <td className={classes}>  
        <IconButton variant="text" color="blue-gray" onClick={handleOpenEdit}>
          <PencilIcon className="h-4 w-4" />
        </IconButton>     
        <IconButton  variant="text" color="blue-gray" onClick={handleOpen}>
          <TrashIcon className="h-4 w-4" />
        </IconButton> 
      </td>
    </tr>
    <Dialog open={open} handler={handleOpen}>
    <DialogBody divider className="grid place-items-center gap-4">
      <BellIcon className="h-16 w-16 text-red-500" />
      <Typography color="red" variant="h4">
      êtes-vous sûr de vouloir supprimer ce produit?
      </Typography>
    </DialogBody>
    <DialogFooter className="space-x-2">
      <Button variant="text" color="blue-gray" onClick={handleOpen}>
        annuler
      </Button>
      <Button variant="gradient" onClick={deleteProduct}>
        Oui, supprimer
      </Button>
    </DialogFooter>
  </Dialog>

  <Dialog open={openEdit} handler={handleOpenEdit}>
    <div className="flex items-center justify-between">
      <DialogHeader>Modifier produit</DialogHeader>
      <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpenEdit} />
    </div>
  <DialogBody divider>
    <div className="grid gap-6">
      <Input label="Nom" value={nomE} onChange={e => setNomE(e.target.value)} />
      <Input label="Prix unitaire" value={prixE} onChange={e => setPrixE(e.target.value)} />
      <Input label="Quantité" value={qteE} onChange={e => setQteE(e.target.value)} />
    </div>
  </DialogBody>
  <DialogFooter className="space-x-2">
    <Button variant="outlined" color="red" onClick={handleOpenEdit}>
      fermer
    </Button>
    <Button variant="gradient" color="green" onClick={updateProduct}>
      modifier
    </Button>
  </DialogFooter>
      </Dialog>
  {alertShow && 
    <Message icon={<CheckCircleIcon className="h-6 w-6"/>} alertShow={alertShow} color='green' message='Produit modifié avec succès!' />
  }
  </>
  )
}

export default Product