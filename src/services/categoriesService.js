import { ServerError, ClientError } from "../commons/exceptions.js";
import client from "./connection.js";

const getAllCategories = async () => {
  let query = `SELECT * FROM categories`;
  try {
    const data = await client.query(query);
    return data.rows;
  } catch (err) {
    throw new ServerError(err.message);
  }
};

const getSpecificCategory = async (id) => {
  let query = `SELECT * FROM categories WHERE id = '${id}'`;
  try {
    const data = await client.query(query);
    if (data.rowCount < 1) {
      throw new ClientError(`Category with id ${id} not found`, 404);
    }
    return data.rows[0];
  } catch (err) {
    if (err instanceof ClientError) {
      throw err;
    }
    throw new ServerError(err.message);
  }
};

const addCategory = async (category) => {
  let findQuery = `SELECT * FROM categories WHERE category LIKE '%${category}%'`;
    const id = `category-${Date.now()}`
  let addQuery = `INSERT INTO categories(id, category) VALUES('${id}', '${category}') RETURNING *`;
  try {
    let data = await client.query(findQuery);
    if (data.rowCount > 0) {
      throw new ClientError("Category already registered", 400);
    }
    data = await client.query(addQuery);

    return data.rows[0];
  } catch (err) {
    if (err instanceof ClientError) {
      throw err;
    }
    throw new ServerError(err.message);
  }
};

const updateCategory = async (id, category) => {
  let findQuery = `SELECT * FROM categories WHERE id = '${id}'`;
  let updateQuery = `UPDATE categories SET category = '${category}', updated_at = CURRENT_TIMESTAMP WHERE id = '${id}' RETURNING *`;
  try {
    let data = await client.query(findQuery);
    if (data.rowCount < 1) {
      throw new ClientError(`Category with id ${id} not found`, 404);
    }
    data = await client.query(updateQuery);

    return data.rows[0];
  } catch (err) {
    if (err instanceof ClientError) {
      throw err;
    }
    throw new ServerError(err.message);
  }
}

const deleteCategory = async (id) => {
  let findQuery = `SELECT * FROM categories WHERE id = '${id}'`;
  let deleteQuery = `DELETE FROM categories WHERE id = '${id}'`;
  try {
    let data = await client.query(findQuery);
    if (data.rowCount < 1) {
      throw new ClientError(`Category with id ${id} not found`, 404);
    }
    await client.query(deleteQuery);
    return
  } catch (err) {
    if (err instanceof ClientError) {
      throw err;
    }
    throw new ServerError(err.message);
  }
}

export { getAllCategories, getSpecificCategory, addCategory, updateCategory, deleteCategory };
