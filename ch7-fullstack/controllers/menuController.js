const prisma = require('../db/prisma');

const getMenu = async (req, res) => {

try {

let menu = await prisma.menu.findMany();

res.json(menu);

} catch (err) {

console.error('Error fetching menu:', err);

res.status(500).json({ error: 'Database error' });

}

};

const getMenuById = async (req, res) => {

const { id } = req.params;

try {

const menu = await prisma.menu.findUnique({

where: { id: Number(id) }

});

if (!menu) {

return res.status(404).json({ error: 'menu not found' });

}

res.json(menu);

} catch (err) {

console.error('Error fetching menu:', err);

res.status(500).json({ error: 'Database error' });

}

};

const createMenu = async (req, res) => {

let { name, price, type_id, is_bast_seller } = req.body;

if (!name || !price || !type_id || !is_bast_seller) {

return res.status(400).json({ error: 'Name and price and type_id and is_bast_seller are required' });

}

try {

const newMenu = await prisma.menu.create({

data: {

name: name,

price: Number(price),

type_id: Number(type_id),

is_bast_seller: is_bast_seller

}

});

res.status(201).json(newMenu);

} catch (err) {

console.error('Error creating menu:', err);

res.status(500).json({ error: 'Database error' });

}

};

const updateMenu = async (req, res) => {

const { id } = req.params;

const { name, price, type_id, is_bast_seller } = req.body;

try {

const updatedMenu = await prisma.menu.update({

where: { id: Number(id) },

data: {

name : name,

price : Number(price),

type_id : Number(type_id),

is_bast_seller : is_bast_seller

}

});

res.json(updatedMenu);

} catch (err) {

console.error('Error updating menu:', err);

res.status(404).json({ error: 'menu not found or database error' });

}

};

const deleteMenu = async (req, res) => {

const { id } = req.params;

try {

await prisma.menu.delete({

where: { id: Number(id) }

});

res.json({ message: 'menu deleted successfully', id: Number(id) });

} catch (err) {

console.error('Error deleting menu:', err);

res.status(404).json({ error: 'menu not found' });

}

};

module.exports = {

getMenu,

getMenuById,

createMenu,

updateMenu,

deleteMenu

};

