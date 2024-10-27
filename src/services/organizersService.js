import { ServerError, ClientError } from "../commons/exceptions.js";
import client from "./connection.js";

const getAllOrganizers = async () => {
  let query = `SELECT * FROM organizers`;
  try {
    const data = await client.query(query);
    return data.rows;
  } catch (err) {
    throw new ServerError(err.message);
  }
};

const getSpecificOrganizer = async (id) => {
  let query = `SELECT * FROM organizers WHERE id = '${id}'`;
  try {
    const data = await client.query(query);
    if (data.rowCount < 1) {
      throw new ClientError(`Organizer with id ${id} not found`, 404);
    }
    return data.rows[0];
  } catch (err) {
    if (err instanceof ClientError) {
      throw err;
    }
    throw new ServerError(err.message);
  }
};

const addOrganizer = async (organizer, email, phone) => {
  let findQuery = `SELECT * FROM organizers WHERE organizer LIKE '%${organizer}%' OR email = '${email}' OR phone = '${phone}'`;
  const id = `organizer-${Date.now()}`
  let addQuery = `INSERT INTO organizers(id, organizer, email, phone) VALUES('${id}', '${organizer}', '${email}', '${phone}') RETURNING *`;
  try {
    let data = await client.query(findQuery);
    if (data.rowCount > 0) {
      throw new ClientError("Organizer already registered", 400);
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

const updateOrganizer = async (id, organizer, email, phone) => {
  let findQuery = `SELECT * FROM organizers WHERE id = '${id}'`;
  try {
    let data = await client.query(findQuery);
    if (data.rowCount < 1) {
      throw new ClientError(`Organizer with id ${id} not found`, 404);
    }
    email = (email && email != '') ? email : data.rows[0].email
    phone = (phone && phone != '') ? phone : data.rows[0].phone
    let updateQuery = `UPDATE organizers SET organizer = '${organizer}', email = '${email}', phone = '${phone}', created_at = CURRENT_TIMESTAMP WHERE id = '${id}' RETURNING *`;
    data = await client.query(updateQuery);

    return data.rows[0];
  } catch (err) {
    if (err instanceof ClientError) {
      throw err;
    }
    throw new ServerError(err.message);
  }
}

const deleteOrganizer = async (id) => {
  let findQuery = `SELECT * FROM organizers WHERE id = '${id}'`;
  let deleteQuery = `DELETE FROM organizers WHERE id = '${id}'`;
  try {
    let data = await client.query(findQuery);
    if (data.rowCount < 1) {
      throw new ClientError(`Organizer with id ${id} not found`, 404);
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

export { getAllOrganizers, getSpecificOrganizer, addOrganizer, updateOrganizer, deleteOrganizer };