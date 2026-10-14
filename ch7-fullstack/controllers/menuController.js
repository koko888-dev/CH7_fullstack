import prisma from '../db/prisma.js';

const getMenu = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        type: true
      }
    });
    res.json(menus);
  } catch (err) {
    console.error('Error fetching menus:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

const getMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await prisma.menu.findUnique({
      where: { menu_id: Number(id) },
      include: {
        type: true
      }
    });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.json(menu);
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

const createMenu = async (req, res) => {
  const { name, price, type_id, is_bast_seller } = req.body;

  if (!name || price === undefined || !type_id || !is_bast_seller) {
    return res.status(400).json({ error: 'Name, price, type_id, and is_bast_seller are required' });
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
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = Number(price);
    if (type_id !== undefined) updateData.type_id = Number(type_id);
    if (is_bast_seller !== undefined) updateData.is_bast_seller = is_bast_seller;

    const updatedMenu = await prisma.menu.update({
      where: { menu_id: Number(id) },
      data: updateData
    });

    res.json(updatedMenu);
  } catch (err) {
    console.error('Error updating menu:', err);
    res.status(404).json({ error: 'Menu not found or database error' });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.menu.delete({
      where: { menu_id: Number(id) }
    });

    res.json({ message: 'Menu deleted successfully', menu_id: Number(id) });
  } catch (err) {
    console.error('Error deleting menu:', err);
    res.status(404).json({ error: 'Menu not found' });
  }
};

export {
  getMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
};

