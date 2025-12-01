/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Coach {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  day: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}