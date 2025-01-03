import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // Add more tests for other endpoints
  it('/boards (POST)', () => {
    return request(app.getHttpServer())
      .post('/boards')
      .send({
        ownerId: '12345',
        users: [{ userId: '12345', userName: 'John Doe', role: 'ADMIN' }],
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body.ownerId).toBe('12345');
      });
  });

  it('/boards (GET)', () => {
    return request(app.getHttpServer())
      .get('/boards')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('/boards/:id (GET)', () => {
    const boardId = 'someExistingBoardId';
    return request(app.getHttpServer())
      .get(`/boards/${boardId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id', boardId);
      });
  });

  it('/boards/:id (PUT)', () => {
    const boardId = 'someExistingBoardId';
    return request(app.getHttpServer())
      .put(`/boards/${boardId}`)
      .send({ ownerId: '67890' })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id', boardId);
        expect(response.body.ownerId).toBe('67890');
      });
  });

  it('/boards/:id (DELETE)', () => {
    const boardId = 'someExistingBoardId';
    return request(app.getHttpServer())
      .delete(`/boards/${boardId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id', boardId);
      });
  });
});
