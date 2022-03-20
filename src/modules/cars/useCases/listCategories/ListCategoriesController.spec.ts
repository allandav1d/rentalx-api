import request from 'supertest'
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
    values('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXXX')`
    );
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    })

    const { refresh_token } = responseToken.body;

    await request(app).post('/categories')
      .send({
        name: "Supertest",
        description: "Categoria de carro Supertest"
      })
      .set({
        Authorization: `Bearer ${refresh_token}`
      });

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  })


})