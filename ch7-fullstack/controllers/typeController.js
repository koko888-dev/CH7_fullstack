const prisma = require('../db/prisma');

const getType = async (req, res) => {

try {

let type = await prisma.type.findMany();

res.json(type);

} catch (err) {

console.error('Error fetching type:', err);

res.status(500).json({ error: 'Database error' });

}

};

const getTypeById = async (req, res) => {

const { id } = req.params;

try {

const type = await prisma.type.findUnique({

where: { id: Number(id) }

});

if (!type) {

return res.status(404).json({ error: 'type not found' });

}

res.json(type);

} catch (err) {

console.error('Error fetching type:', err);

res.status(500).json({ error: 'Database error' });

}

};

const createType = async (req, res) => {

let { name } = req.body;

if (!name) {

return res.status(400).json({ error: 'Name are required' });

}

try {

const newType = await prisma.type.create({

data: {

name: name,

}

});

res.status(201).json(newType);

} catch (err) {

console.error('Error creating type:', err);

res.status(500).json({ error: 'Database error' });

}

};

const updateType = async (req, res) => {

const { id } = req.params;

const { name } = req.body;

try {

const updatedType = await prisma.type.update({

where: { id: Number(id) },

data: {

name : name,

}

});

res.json(updatedType);

} catch (err) {

console.error('Error updating type:', err);

res.status(404).json({ error: 'type not found or database error' });

}

};

const deleteType = async (req, res) => {

const { id } = req.params;

try {

await prisma.type.delete({

where: { id: Number(id) }

});

res.json({ message: 'type deleted successfully', id: Number(id) });

} catch (err) {

console.error('Error deleting type:', err);

res.status(404).json({ error: 'type not found' });

}

};

module.exports = {

getType,

getTypeById,

createType,

updateType,

deleteType

};

