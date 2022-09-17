import { ApiUser } from '@/shared/interfaces/api/apiUser';

export interface Better extends ApiUser {
  betAmount: number;
  betOption: number;
}

export interface PollOption {
  id: number;
  name: string;
}

interface BasePoll {
  name: string;
  poll: number;
  finished: boolean;
  allowBetting: boolean;
}

export interface PollForm extends BasePoll {
  betters: string;
  options: string;
}

export interface ApiPoll extends BasePoll {
  id: number;
  betters: string;
  options: string;
  winningOptions: number[];
}

export interface ApiPollJson extends BasePoll {
  id: number;
  options: PollOption[];
  winningOptions: number[];
  betters: Better[];
}
