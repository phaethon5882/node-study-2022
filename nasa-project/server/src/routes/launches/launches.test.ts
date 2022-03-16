import request from 'supertest';
import app from '../../app';

// supertest 를 사용하면 우리가 만든 api 를 테스트 할 수 있다. Unit test 가 아닌 api layer test 또는 integration test 라고 할 수 있을듯.
describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);

    // expect(response.statusCode).toBe(200);
  });
});

describe('Test POST /launches', () => {
  const completeLaunchDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701 -D',
    target: 'Kepler-186 f',
    launchDate: 'January 4, 2028',
  };

  const launchDateWithoutDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701 -D',
    target: 'Kepler-186 f',
  };

  const launchDataWithInvalidDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701 -D',
    target: 'Kepler-186 f',
    launchDate: '이상한 날짜형식 ㅎㅎ',
  };

  test('It should respond with 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchDate)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchDate.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    // Match 대상이 포함되는지 확인함.
    expect(response.body).toMatchObject(launchDateWithoutDate);
  })

  test('It should catch missing required properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDateWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    });
  });

  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    });
  });
});