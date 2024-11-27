import Axios, { AxiosPromise } from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

const urls = {
  character: 'character',
  episode: 'episode',
};
export const apiClient = Axios.create({
  baseURL: BASE_URL,
});

export type CharactersResponse = {
  results: Character[];
};

export const getCharacters = (): AxiosPromise<CharactersResponse> =>
  apiClient.get(urls.character);

export const getCharacter = (id: string): AxiosPromise<Character> =>
  apiClient.get(`${urls.character}/${id}`);
