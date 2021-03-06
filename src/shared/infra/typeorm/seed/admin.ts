import { getConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost', 5433);

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
  values('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXXX')`
  );

  await connection.close;
}

create().then(() => console.log('User admin created!'))