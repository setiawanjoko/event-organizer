import { ServerError, ClientError } from "../commons/exceptions.js";
import client from "./connection.js";

const getAllEvents = async () => {
  let query = `SELECT * FROM events`;
  try {
    const data = await client.query(query);
    return data.rows;
  } catch (err) {
    throw new ServerError(err.message);
  }
};

const getSpecificEvent = async (id) => {
  let query = `SELECT * FROM events WHERE id = '${id}'`;
  try {
    const data = await client.query(query);
    if (data.rowCount < 1) {
      throw new ClientError(`Event with id ${id} not found`, 404);
    }
    return data.rows[0];
  } catch (err) {
    if (err instanceof ClientError) {
      throw err;
    }
    throw new ServerError(err.message);
  }
};

const addEvent = async (title, location, date_time, is_open) => {
  let findQuery = `SELECT * FROM events WHERE title LIKE '%${title}%'`;
  const id = `event-${Date.now()}`;
  let addQuery = `INSERT INTO events(id, title, location, date_time, is_open) VALUES('${id}', '${title}', '${location}', '${date_time}', ${is_open}) RETURNING *`;
  console.log(addQuery);
  try {
    let data = await client.query(findQuery);
    if (data.rowCount > 0) {
      throw new ClientError("Event already registered", 400);
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

const updateEvent = async (id, title, location, date_time, is_open) => {
  let findQuery = `SELECT * FROM events WHERE id = '${id}'`;
  try {
    let data = await client.query(findQuery);
    if (data.rowCount < 1) {
      throw new ClientError(`Event with id ${id} not found`, 404);
    }
    title = title && title != "" ? title : data.rows[0].title;
    location = location && location != "" ? location : data.rows[0].location;
    console.log("date_time before", date_time);

    date_time =
      date_time && date_time != "" ? date_time : data.rows[0].date_time;
    console.log("date_time after", date_time);

    is_open = is_open && is_open != "" ? is_open : data.rows[0].is_open;
    let updateQuery = `UPDATE events SET title = '${title}', location = '${location}', date_time = '${date_time.toISOString()}', is_open = ${is_open}, updated_at = CURRENT_TIMESTAMP WHERE id = '${id}' RETURNING *`;
    data = await client.query(updateQuery);

    return data.rows[0];
  } catch (err) {
    if (err instanceof ClientError) {
      throw err;
    }
    throw new ServerError(err.message);
  }
};

const deleteEvent = async (id) => {
  let findQuery = `SELECT * FROM events WHERE id = '${id}'`;
  let deleteQuery = `DELETE FROM events WHERE id = '${id}'`;
  try {
    let data = await client.query(findQuery);
    if (data.rowCount < 1) {
      throw new ClientError(`Event with id ${id} not found`, 404);
    }
    await client.query(deleteQuery);
    return;
  } catch (err) {
    if (err instanceof ClientError) {
      throw err;
    }
    throw new ServerError(err.message);
  }
};

export { getAllEvents, getSpecificEvent, addEvent, updateEvent, deleteEvent };
