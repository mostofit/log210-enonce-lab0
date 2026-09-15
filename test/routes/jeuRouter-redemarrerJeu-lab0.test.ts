import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest';
import app from '../../src/app';
import { jeuRoutes } from '../../src/routes/jeuRouter';

const request = supertest(app);

const testNom1 = 'Jean-Marc';
const testNom2 = 'Pierre';

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });
  });

  it('devrait répondre avec succès', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it('devrait supprimer tous les joueurs', async () => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);

    expect(joueursArray.length).toBe(0);
  });

});