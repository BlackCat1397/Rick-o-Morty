import Axios, { AxiosPromise } from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

const urls = {
  character: 'character',
  episode: 'episode',
};
export const apiClient = Axios.create({
  baseURL: BASE_URL,
});

export enum Status {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

type Origin = {
  name: string;
  url: string;
};

type Location = {
  name: string;
  url: string;
};

export type Character = {
  id: string;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharactersResponse = {
  results: Character[];
};

export const getCharacters = (): AxiosPromise<CharactersResponse> =>
  apiClient.get(urls.character);

export const getCharacter = (id: string): AxiosPromise<Character> =>
  apiClient.get(`${urls.character}/${id}`);
