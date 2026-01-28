import Menu from "../models/menuModel.js";

export const createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json({
      success: true,
      data: menu,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllMenus = async (req, res) => {
  const menus = await Menu.find().sort({ menu_order: 1 });
  res.json({
    success: true,
    data: menus,
  });
};

export const getActiveMenus = async (req, res) => {
  const menus = await Menu.find({ menu_status: true }).sort({
    menu_order: 1,
  });

  res.json({
    success: true,
    data: menus,
  });
};

export const getMenuById = async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  res.json({
    success: true,
    data: menu,
  });
};

export const updateMenu = async (req, res) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    success: true,
    data: menu,
  });
};
export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findByIdAndDelete(id);

    if (!menu) {
      return res.status(404).json({
        status: "Error",
        message: "Menu not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Menu deleted successfully",
    });
  } catch (error) {
    console.error("Delete menu error:", error);
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
