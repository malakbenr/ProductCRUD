import './App.css';
import Product from './components/Product';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, CheckCircleIcon, } from "@heroicons/react/24/solid";
import { PlusCircleIcon,  } from "@heroicons/react/24/outline";
import { Card,  Dialog, DialogHeader, DialogBody, DialogFooter, CardHeader, Input, Typography, Button, CardBody, } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import Message from './components/Message';


function App() {

  const API_URL = "http://127.0.0.1:8000/rest_api/produits/";

  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
  const TABLE_HEAD = ["Nom produit", "Prix unitaire", "Quantité", ""];
   
  const [produits, setProduits] = useState([]);
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState(0);
  const [qte, setQte] = useState(0);
  const [alertShow, setAlertShow] = useState(false);
  const [searchText, setSearchText] = useState("");

  //Lister tous les produits
  const fetchProducts = () => {
    fetch(API_URL).then(response => {
      return response.json()
    }).then(data => {setProduits(data)})
  }

  useEffect(() => {
    fetchProducts()
  }, [produits])

  //Ajouter un nouveau produit
  const addProduct = () => {
    if (nom && prix && qte){
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          nom, prix, qte,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(response => response.json())
        .then(data => {
          setProduits([...produits, data]);
          setNom("");
          setPrix(0);
          setQte(0);
          setAlertShow(true);
          setOpen(false);
        })
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-[#F7FAFC]">
        <Card className="w-[80%] h-[80%]">
        <CardHeader floated={false} shadow={false} className="overflow-visible">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant='h5' className="text-blue-500">Liste des produits</Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="w-full md:w-72">
              <Input label="Chercher..." icon={<MagnifyingGlassIcon className="h-5 w-5" />} 
              onChange={e => {setSearchText(e.target.value);}} />
            </div>
          </div>  
            <div className="flex shrink-0 gap-2 sm:flex-row">
              <Button onClick={handleOpen} className="flex items-center gap-3"><PlusCircleIcon className="h-5 w-5"/> Ajouter</Button>
            </div>
          </div>
    
        </CardHeader>
        <CardBody className="overflow-y-auto px-0">
          <table className=" mt-4 w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {produits.length > 0 && (
              <tbody>
                {produits.filter(p => p.nom.toLowerCase().includes(searchText.toLowerCase()))
                  .map((produit, index) => {
                  const isLast = index === produits.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                  return <Product produit={produit} classes={classes} key={produit.id} /> 
                })}
                </tbody>
            )}
          </table>
        </CardBody>
        </Card>
        
      <Dialog open={open} handler={handleOpen}>
          <div className="flex items-center justify-between">
            <DialogHeader>Nouveau produit</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
          </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input label="Nom" value={nom} onChange={e => setNom(e.target.value)} />
            <Input label="Prix unitaire" value={prix} onChange={e => setPrix(e.target.value)} />
            <Input label="Quantité" value={qte} onChange={e => setQte(e.target.value)} />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            fermer
          </Button>
          <Button variant="gradient" color="green" onClick={addProduct}>
            ajouter
          </Button>
        </DialogFooter>
      </Dialog>  
      {alertShow && 
        <Message icon={<CheckCircleIcon className="h-6 w-6"/>} alertShow={alertShow} color='green' message='Produit ajouté avec succès!' />
      }
    </div>
  );
}

export default App;